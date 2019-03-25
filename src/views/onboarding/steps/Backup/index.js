import React from 'react';
import styled from 'styled-components';
import {
    H4, P, Button, Checkbox,
} from 'trezor-ui-components';
import { FormattedMessage } from 'react-intl';

import colors from 'config/colors';
import types from 'config/types';
import { WIPE_DEVICE } from 'actions/constants/calls';

import { UnorderedList } from 'components/Lists';
import { ID } from 'views/onboarding/constants/steps';

import l10nCommonMessages from 'support/commonMessages';
import l10nMessages from './index.messages';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper, CheckboxWrapper,
} from '../../components/Wrapper';
import BackupModelOne from './components/BackupModelOne';

const Panel = styled.div`
    background-color: ${colors.grayLight};
    color: ${colors.grayDark};
    padding: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

class BackupStep extends React.Component {
    static INITIAL_STATUS = 'initial';

    static STARTED_STATUS = 'started';

    static FAILED_STATUS = 'failed';


    constructor(props) {
        super(props);
        this.state = {
            userUnderstands: false,
            status: BackupStep.INITIAL_STATUS,
        };
    }

    componentDidMount() {
        this.props.connectActions.resetCall();
    }

    getStatus() {
        const { status } = this.state;
        const { device, deviceCall } = this.props;
        if (deviceCall.name === 'backupDevice' && deviceCall.error) {
            return BackupStep.FAILED_STATUS;
        }
        // todo: hmm started? somehow better?
        if (status === BackupStep.STARTED_STATUS && device) {
            return BackupStep.STARTED_STATUS;
        }
        if (device && device.features.needs_backup && !deviceCall.isProgress) {
            return BackupStep.INITIAL_STATUS;
        }
        return null;
    }

    async wipeDeviceAndStartAgain() {
        this.props.connectActions.callActionAndGoToNextStep(WIPE_DEVICE, null, ID.BACKUP_STEP);
    }

    render() {
        const {
            device, deviceCall, onboardingActions, deviceInteraction, connectActions,
        } = this.props;
        const instructions = [{
            component: <P><FormattedMessage {...l10nMessages.TR_DO_NOT_UPLOAD_INSTRUCTION} /></P>,
            key: '1',
        }, {
            component: <P><FormattedMessage {...l10nMessages.TR_HIDE_TO_SAFE_PLACE_INSTRUCTION} /></P>,
            key: '2',
        }, {
            component: <P><FormattedMessage {...l10nMessages.TR_DO_NOT_SAFE_IN_COMPUTER_INSTRUCTION} /></P>,
            key: '3',
        }, {
            component: <P><FormattedMessage {...l10nMessages.TR_DO_NOT_TAKE_PHOTO_INSTRUCTION} /></P>,
            key: '4',
        }];

        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <FormattedMessage {...l10nMessages.TR_SEED_IS_MORE_IMPORTANT_THAN_YOUR_DEVICE} />

                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        this.getStatus() === BackupStep.INITIAL_STATUS && (
                            <React.Fragment>
                                <P>
                                    <FormattedMessage {...l10nMessages.TR_BACKUP_SUBHEADING_1} />
                                </P>
                                <P>
                                    <FormattedMessage {...l10nMessages.TR_BACKUP_SUBHEADING_2} />
                                </P>

                                <UnorderedList items={instructions} />

                                <Panel>
                                    <P>
                                        <FormattedMessage {...l10nMessages.TR_SATOSHILABS_CANNOT_BE_HELD_RESPONSIBLE} />
                                    </P>
                                </Panel>
                                <CheckboxWrapper style={{ alignSelf: 'flex-start' }}>
                                    <Checkbox
                                        isChecked={this.state.userUnderstands}
                                        onClick={() => this.setState(prevState => ({ userUnderstands: !prevState.userUnderstands }))}
                                    />
                                    <P>
                                        <FormattedMessage {...l10nMessages.TR_I_HAVE_READ_INSTRUCTIONS} />
                                    </P>
                                </CheckboxWrapper>

                                <ControlsWrapper>
                                    <Button
                                        onClick={() => { this.setState({ status: 'started' }); }}
                                        isDisabled={!device || !this.state.userUnderstands}
                                    >
                                        <FormattedMessage {...l10nMessages.TR_START_BACKUP} />
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        this.getStatus() === BackupStep.STARTED_STATUS && (
                            <BackupModelOne
                                onboardingActions={onboardingActions}
                                connectActions={connectActions}
                                deviceCall={deviceCall}
                                deviceInteraction={deviceInteraction}
                                device={this.props.device}
                            />
                        )
                    }

                    {
                        this.getStatus() === BackupStep.FAILED_STATUS && (
                            <React.Fragment>
                                <H4>
                                    <FormattedMessage {...l10nMessages.TR_DEVICE_DISCONNECTED_DURING_ACTION} />
                                </H4>
                                <P>
                                    <FormattedMessage {...l10nMessages.TR_DEVICE_DISCONNECTED_DURING_ACTION_DESCRIPTION} />
                                </P>
                                <ControlsWrapper>
                                    <Button
                                        onClick={() => { this.wipeDeviceAndStartAgain(); }}
                                        isDisabled={!device || !device.connected}
                                    >
                                        <FormattedMessage {...l10nMessages.TR_WIPE_DEVICE_AND_START_AGAIN} />
                                    </Button>
                                </ControlsWrapper>
                                {
                                    (!device || !device.connected) && (
                                        <P><FormattedMessage {...l10nCommonMessages.TR_CONNECT_YOUR_DEVICE} /></P>
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

BackupStep.propTypes = {
    connectActions: types.connectActions,
    onboardingActions: types.onboardingActions,
    device: types.device,
    deviceCall: types.deviceCall,
    deviceInteraction: types.deviceInteraction,
};

export default BackupStep;