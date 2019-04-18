import React from 'react';
import styled from 'styled-components';
import {
    H4, P, Button, Checkbox,
} from 'trezor-ui-components';
import { FormattedMessage } from '@dragonraider5/react-intl';

import colors from 'config/colors';
import types from 'config/types';
import { WIPE_DEVICE, BACKUP_DEVICE } from 'actions/constants/calls';

import { UnorderedList } from 'components/Lists';
import { ID } from 'constants/steps';
import Text from 'views/onboarding/components/Text';

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
    static STARTED_STATUS = 'started';

    static FAILED_STATUS = 'failed';

    static INITIAL_STATUS = 'initial';

    static SUCCESS_STATUS = 'success';

    constructor(props) {
        super(props);
        this.state = {
            userUnderstands: false,
        };
    }

    componentDidMount() {
        this.props.connectActions.resetCall();
    }

    getStatus() {
        const {
            device, deviceCall, deviceInteraction,
        } = this.props;
        if ((deviceCall.name === BACKUP_DEVICE && deviceCall.error) || device.features.no_backup === true || device.features.initialized === false) {
            return BackupStep.FAILED_STATUS;
        }
        if (device && device.features.needs_backup === true && deviceInteraction.counter > 0) {
            return BackupStep.STARTED_STATUS;
        }
        if (device && device.features.needs_backup && !deviceCall.isProgress) {
            return BackupStep.INITIAL_STATUS;
        }
        if (device && device.features.needs_backup === false) {
            return BackupStep.SUCCESS_STATUS;
        }
        return null;
    }

    async wipeDeviceAndStartAgain() {
        this.props.connectActions.callActionAndGoToNextStep(WIPE_DEVICE, null, ID.START_STEP);
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
                                        onClick={() => { this.props.connectActions.backupDevice(); }}
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
                                    {
                                        device.features.initialized === true && (
                                            <Button
                                                onClick={() => { this.props.connectActions.wipeDevice(); }}
                                                isDisabled={!device || !device.connected}
                                            >
                                                <FormattedMessage {...l10nCommonMessages.TR_WIPE_DEVICE} />
                                            </Button>
                                        )
                                    }

                                    {
                                        device.features.initialized === false && (
                                            <Button
                                                onClick={() => { this.props.connectActions.resetDevice(); }}
                                                isDisabled={!device || !device.connected}
                                            >
                                                <FormattedMessage {...l10nCommonMessages.TR_RESET_DEVICE} />
                                            </Button>
                                        )
                                    }

                                </ControlsWrapper>
                                {
                                    (!device || !device.connected) && (
                                        <Text>
                                            <FormattedMessage {...l10nCommonMessages.TR_CONNECT_YOUR_DEVICE} />
                                        </Text>
                                    )
                                }
                            </React.Fragment>
                        )
                    }

                    {
                        this.getStatus() === BackupStep.SUCCESS_STATUS && (
                            <React.Fragment>
                                <Text>
                                    <FormattedMessage {...l10nMessages.TR_BACKUP_FINISHED_TEXT} />
                                </Text>
                                <ControlsWrapper>
                                    <Button onClick={() => onboardingActions.goToNextStep()}>
                                        <FormattedMessage {...l10nMessages.TR_BACKUP_FINISHED_BUTTON} />
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

BackupStep.propTypes = {
    connectActions: types.connectActions,
    onboardingActions: types.onboardingActions,
    device: types.device,
    deviceCall: types.deviceCall,
    deviceInteraction: types.deviceInteraction,
};

export default BackupStep;