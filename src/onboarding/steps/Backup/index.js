import React from 'react';
import styled from 'styled-components';
import {
    H4, P, Button, Checkbox, Icon,
} from 'trezor-ui-components';
import { FormattedMessage } from '@dragonraider5/react-intl';

import colors from 'config/colors';
import types from 'config/types';
import { WIPE_DEVICE, BACKUP_DEVICE } from 'actions/constants/calls';

import { ID } from 'constants/steps';
import Text from 'components/Text';
import l10nCommonMessages from 'support/commonMessages';

import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper, CheckboxWrapper,
} from 'components/Wrapper';
import BackupModelOne from './components/BackupModelOne';
import l10nMessages from './index.messages';

const Panel = styled.div`
    background-color: ${colors.grayLight};
    color: ${colors.grayDark};
    padding: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Icons = styled.div`
    display: flex;
    flex-direction: row;
    width: 90%;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Instruction = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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

                                {/* todo: refactor icons to components */}
                                <Icons>
                                    <Instruction>
                                        <Icon
                                            size={80}
                                            icon={{
                                                paths: [
                                                    'm2.515 20.899-1.414-1.414.676-.677c-1.084-.92-1.777-2.29-1.777-3.808 0-2.64 2.05-4.78 4.65-4.97.68-3.44 3.71-6.03 7.35-6.03 1.322 0 2.564.343 3.642.944l3.843-3.843 1.414 1.414zm16.135-12.869c3.01.33 5.35 2.87 5.35 5.97 0 3.29-2.71 6-6 6h-11.615l11.962-11.962c.114-.005.215-.008.303-.008z',
                                                ],
                                                viewBox: '0 0 24 24',
                                                ratio: 1,
                                            }}
                                        />
                                        <FormattedMessage {...l10nMessages.TR_DO_NOT_UPLOAD_INSTRUCTION} />
                                    </Instruction>

                                    <Instruction>
                                        <Icon
                                            size={80}
                                            icon={{
                                                paths: [
                                                    'm2.515 20.899-1.414-1.414.967-.967c-.044-.165-.068-.339-.068-.518v-13c0-1.11.89-2 2-2h6l2 2h3.586l3.899-3.899 1.414 1.414zm18.558-15.587c.557.355.927.978.927 1.688v11c0 1.105-.895 2-2 2h-13.615l6.182-6.183 3.433 3.433 4.25-4.25h-3.25v-3.615zm-7.688 7.688 1.615-1.615v1.615z',
                                                ],
                                                viewBox: '0 0 24 24',
                                                ratio: 1,
                                            }}
                                        />
                                        <FormattedMessage {...l10nMessages.TR_DO_NOT_SAFE_IN_COMPUTER_INSTRUCTION} />
                                    </Instruction>

                                    <Instruction>
                                        <Icon
                                            size={80}
                                            icon={{
                                                paths: [
                                                    'm2.515 20.899-1.414-1.414.967-.967c-.044-.165-.068-.339-.068-.518v-12c0-1.105.895-2 2-2h3l2-2h6l1.793 1.793 2.692-2.692 1.414 1.414zm19.079-16.108c.255.336.406.755.406 1.209v12c0 1.105-.895 2-2 2h-13.615l3.478-3.478c.648.306 1.372.478 2.137.478 2.761 0 5-2.239 5-5 0-.765-.172-1.489-.478-2.137zm-10.157 10.156 3.51-3.51c.035.183.053.371.053.563 0 1.657-1.343 3-3 3-.192 0-.38-.018-.563-.053zm-4.241-1.557 1.837-1.837c.194-1.299 1.221-2.326 2.52-2.52l1.837-1.837c-.441-.128-.908-.196-1.39-.196-2.761 0-5 2.239-5 5 0 .482.068.949.196 1.39z',
                                                ],
                                                viewBox: '0 0 24 24',
                                                ratio: 1,
                                            }}
                                        />
                                        <FormattedMessage {...l10nMessages.TR_DO_NOT_TAKE_PHOTO_INSTRUCTION} />
                                    </Instruction>
                                </Icons>

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