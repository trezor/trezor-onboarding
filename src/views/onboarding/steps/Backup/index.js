import React from 'react';
import styled from 'styled-components';
import {
    H4, P, Button, Checkbox,
} from 'trezor-ui-components';

import colors from 'config/colors';
import types from 'config/types';
import { WIPE_DEVICE } from 'actions/constants/calls';

import { UnorderedList } from 'components/Lists';
import { ID } from 'views/onboarding/constants/steps';

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
            component: <P>Do not upload words on the internet.</P>,
            key: '1',
        }, {
            component: <P>Hide them somewhere safe.</P>,
            key: '2',
        }, {
            component: <P>Your device can be lost or stolen but seed means access to your money.</P>,
            key: '3',
        }];

        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    Seed is more important than your device
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        this.getStatus() === BackupStep.INITIAL_STATUS && (
                            <React.Fragment>
                                <P>
                                        Owning cryptocurrencies means having a secret and not sharing it with anyone! Now your device will
                                        tell you the secret. This will happen only once. Write it down and keep it safe. Never tell anyone!
                                </P>
                                <UnorderedList items={instructions} />

                                <Panel>
                                    <P>
                                        Trezor cannot be held responsible for security liabilities or financial losses resulting from not following these security instructions
                                    </P>
                                </Panel>
                                <CheckboxWrapper style={{ alignSelf: 'flex-start' }}>
                                    <Checkbox
                                        isChecked={this.state.userUnderstands}
                                        onClick={() => this.setState(prevState => ({ userUnderstands: !prevState.userUnderstands }))}
                                    />
                                    <P>I have read the instructions and agree</P>
                                </CheckboxWrapper>

                                <ControlsWrapper>
                                    <Button
                                        onClick={() => { this.setState({ status: 'started' }); }}
                                        isDisabled={!device || !this.state.userUnderstands}
                                    >
                                        Start backup
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
                                <H4>Device disconnected during action</H4>
                                <P>
                                    You device disconnected during action which resulted in interuption
                                    of backup process. For security reasons you need to wipe your device now
                                    and start the backup process again.
                                </P>
                                <ControlsWrapper>
                                    <Button
                                        onClick={() => { this.wipeDeviceAndStartAgain(); }}
                                        isDisabled={!device || !device.connected}
                                    >
                                            Wipe device and start again
                                    </Button>
                                </ControlsWrapper>
                                {
                                    (!device || !device.connected) && (<P>Connect your device</P>)
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