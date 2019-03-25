import React from 'react';
import { P, Button } from 'trezor-ui-components';
import { FormattedMessage, injectIntl } from 'react-intl';

import types from 'config/types';
import { DONUT_STROKE, DONUT_RADIUS } from 'config/constants';
import colors from 'config/colors';
import { GET_FIRMWARE } from 'actions/constants/fetchCalls';
import { FIRMWARE_ERASE, FIRMWARE_UPLOAD } from 'actions/constants/calls';

import { Donut, Dots } from 'components/Loaders';

import commonMessages from 'support/commonMessages';
import l10nMessages from './index.messages';

import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from '../../components/Wrapper';

//todo: handle case when already has firmware, but it is outdated
class FirmwareStep extends React.Component {
    constructor() {
        super();
        this.state = {
            progress: null,
        };
    }

    getStatus() {
        const {
            device, fetchCall, deviceCall,
        } = this.props;

        if (device.firmware === 'valid') {
            return 'success';
        }

        if (deviceCall.error) {
            return 'deviceCall-error';
        }

        if (fetchCall.error) {
            return 'fetchCall-error';
        }

        if (deviceCall.name === FIRMWARE_UPLOAD && deviceCall.result) {
            return 'reconnect';
        }

        if (deviceCall.name === FIRMWARE_UPLOAD) {
            return 'installing';
        }

        if (deviceCall.name === FIRMWARE_ERASE) {
            return 'preparing';
        }

        if (fetchCall.name === GET_FIRMWARE) {
            return 'downloading';
        }

        if (device.firmware === 'none' || device.firmware === 'unknown') {
            return 'initial';
        }

        // todo: ?? maybe throw error, there shouldt be unexpected state ever
        return '?';
    }

    getMessageForStatus = () => {
        const { device } = this.props;
        const status = this.getStatus();
        if (device.features.major_version === 1) {
            if (status === 'reconnect' && !device.connected) {
                return this.props.intl.formatMessage(l10nMessages.TR_CONNECT_YOUR_DEVICE_AGAIN);
            }
            if (status === 'reconnect' && device.connected) {
                return this.props.intl.formatMessage(l10nMessages.TR_DISCONNECT_YOUR_DEVICE);
            }
        } else if (status === 'reconnect') {
            return this.props.intl.formatMessage(l10nMessages.TR_WAIT_FOR_REBOOT);
        }

        return status;
    }

    // a little more visual logic in component, I didnt want to bloat actions with this.
    install = async () => {
        this.props.connectActions.updateFirmware();
        this.setState({ progress: 0 });
        const progressFn = () => {
            this.setState(prevState => ({ progress: prevState.progress + 1 }));
        };
        const tresholds = {
            downloading: 10,
            preparing: 40,
            uploading: 100,
        };
        const interval = setInterval(() => {
            if (this.props.deviceCall.error || this.props.fetchCall.error) {
                this.setState({ progress: 100 });
                clearInterval(interval);
                return;
            }
            if (this.state.progress >= tresholds[this.getStatus()] || this.state.progress >= 100) {
                if (this.getStatus() === 'success') {
                    clearInterval(interval);
                }
                return;
            }
            progressFn();
        }, this.props.device.features.major_version === 1 ? 170 : 561);
    }

    isProgress() {
        const status = this.getStatus();
        const targetStates = ['downloading', 'preparing', 'installing', 'reconnect', 'deviceCall-error', 'fetchCall-error'];
        return targetStates.includes(status);
    }

    render() {
        const {
            device, deviceCall, fetchCall,
        } = this.props;
        const isConnected = device && device.connected;

        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <FormattedMessage {...l10nMessages.TR_FIRMWARE_HEADING} />
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        this.getStatus() === 'initial' && (
                            <React.Fragment>
                                <P>
                                    <FormattedMessage {...l10nMessages.TR_FIRMWARE_SUBHEADING} />
                                </P>
                                <ControlsWrapper>
                                    <Button onClick={() => this.install()}>
                                        <FormattedMessage {...l10nMessages.TR_INSTALL} />
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        this.isProgress() && (
                            <React.Fragment>
                                <Donut
                                    progress={this.state.progress}
                                    radius={DONUT_RADIUS}
                                    stroke={DONUT_STROKE}
                                    isSuccess={this.getStatus() === 'success'}
                                    isError={deviceCall.error !== null || fetchCall.error !== null}
                                />
                                {
                                    !deviceCall.error && !fetchCall.error && <P>{this.getMessageForStatus()}<Dots /></P>
                                }
                                {
                                    (deviceCall.error || fetchCall.error) && (
                                        <React.Fragment>
                                            {
                                                deviceCall.error && (
                                                    <P style={{ color: colors.error }}>
                                                        <FormattedMessage {...l10nMessages.TR_INSTALL_ERROR_OCCURRED} values={{ error: deviceCall.error }} />
                                                    </P>
                                                )
                                            }
                                            {
                                                fetchCall.error && (
                                                    <P style={{ color: colors.error }}>
                                                        <FormattedMessage {...l10nMessages.TR_FETCH_ERROR_OCCURRED} values={{ error: fetchCall.error }} />
                                                    </P>
                                                )
                                            }
                                            <Button onClick={() => this.install()}>
                                                <FormattedMessage {...commonMessages.TR_RETRY} />
                                            </Button>
                                        </React.Fragment>
                                    )
                                }
                            </React.Fragment>
                        )
                    }

                    {
                        this.getStatus() === 'success'
                        && (
                            <React.Fragment>
                                <P>
                                    <FormattedMessage {...l10nMessages.TR_FIRMWARE_INSTALLED} />
                                </P>
                                <ControlsWrapper>
                                    <Button isDisabled={!isConnected} onClick={() => this.props.onboardingActions.goToNextStep()}>
                                        <FormattedMessage {...commonMessages.TR_CONTINUE} />
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

FirmwareStep.propTypes = {
    connectActions: types.connectActions,
    onboardingActions: types.onboardingActions,
    device: types.device,
    fetchCall: types.fetchCall,
    deviceCall: types.deviceCall,
};


export default injectIntl(FirmwareStep);