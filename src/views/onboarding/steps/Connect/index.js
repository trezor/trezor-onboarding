import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTimeout from 'react-timeout';
import {
    P, H4, Button, Icon, icons,
} from 'trezor-ui-components';
import { FormattedMessage } from '@dragonraider5/react-intl';


import types from 'config/types';
import { TrezorConnect } from 'components/Prompts';
import { Dots } from 'components/Loaders';

import l10nCommonMessages from 'support/commonMessages';
import l10nMessages from './index.messages';

import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from '../../components/Wrapper';
import TroubleshootBootloader from './components/TroubleshootBootloader';
import TroubleshootInitialized from './components/TroubleshootInitialized';
import TroubleshootSearchingTooLong from './components/TroubleshootTooLong';

const DeviceIconWrapper = styled.div`
    margin-bottom: 30px;
`;

class ConnectStep extends React.PureComponent {
    static IS_SEARCHING_TIMEOUT = 5 * 1000;

    static IS_SEARCHING_TOO_LONG_TIMEOUT = 1 * 1000;

    constructor(props) {
        super(props);
        this.state = {
            isSearching: false,
            isSearchingTooLong: false,
        };
    }

    componentDidMount() {
        this.props.setTimeout(() => this.setState({ isSearching: true }), ConnectStep.IS_SEARCHING_TIMEOUT);
        this.props.setTimeout(() => this.setState({ isSearchingTooLong: true }), ConnectStep.IS_SEARCHING_TOO_LONG_TIMEOUT);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.device && nextProps.device === null) {
            this.setState({ isSearching: true });
            this.props.setTimeout(() => this.setState({ isSearchingTooLong: true }), 15 * 1000);
        } else {
            this.setState({ isSearchingTooLong: false });
        }
    }

    isInBlWithFwPresent() {
        const { device } = this.props;
        if (!device) {
            return null;
        }
        return device.mode === 'bootloader' && device.features.firmware_present === true;
    }

    render() {
        const deviceIsConnected = Boolean(this.props.device && this.props.device.connected);
        const {
            device, deviceCall, connectActions, model, onboardingActions, activeSubStep,
        } = this.props;
        const { isSearching, isSearchingTooLong } = this.state;
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <FormattedMessage {...l10nMessages.TR_CONNECT_HEADING} />
                </StepHeadingWrapper>
                <StepBodyWrapper>

                    <TrezorConnect model={this.props.model} height={180} loop={!deviceIsConnected} />

                    {
                        !deviceIsConnected
                        && (
                            <P>
                                <FormattedMessage {...l10nMessages.TR_MAKE_SURE_IT_IS_WELL_CONNECTED} />
                                {' '}
                                <FormattedMessage {...l10nMessages.TR_SEARCHING_FOR_YOUR_DEVICE} />
                                <Dots />
                            </P>
                        )
                    }

                    {
                        !deviceIsConnected && isSearching && isSearchingTooLong && (
                            <TroubleshootSearchingTooLong />
                        )
                    }

                    {
                        deviceIsConnected && !deviceCall.isProgress && (
                            <React.Fragment>
                                {
                                    !device.features.initialized && this.isInBlWithFwPresent() === false && (
                                        <React.Fragment>
                                            <H4>
                                                <FormattedMessage {...l10nMessages.TR_DEVICE_DETECTED} />
                                            </H4>
                                            <P>
                                                <FormattedMessage {...l10nMessages.TR_FOUND_OK_DEVICE} />
                                            </P>
                                            <ControlsWrapper>
                                                <Button
                                                    onClick={() => this.props.onboardingActions.goToNextStep()}
                                                >
                                                    <FormattedMessage {...l10nCommonMessages.TR_CONTINUE} />
                                                </Button>
                                            </ControlsWrapper>
                                        </React.Fragment>
                                    )
                                }

                                {
                                    this.isInBlWithFwPresent() && (<TroubleshootBootloader />)
                                }

                                {
                                    device.features.initialized && (
                                        <TroubleshootInitialized
                                            device={device}
                                            connectActions={connectActions}
                                            onboardingActions={onboardingActions}
                                            activeSubStep={activeSubStep}
                                        />
                                    )
                                }
                            </React.Fragment>
                        )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

ConnectStep.propTypes = {
    device: types.device,
    deviceCall: types.deviceCall,
    connectActions: types.connectActions,
    onboardingActions: types.onboardingActions.isRequired,
    model: types.model,
    setTimeout: PropTypes.func.isRequired,
    activeSubStep: types.activeSubStep,
};

export default ReactTimeout(ConnectStep);