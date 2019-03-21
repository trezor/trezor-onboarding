import React from 'react';
import styled from 'styled-components';
import { Button, P } from 'trezor-ui-components';

import types from 'config/types';

import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../../components/Wrapper';

import NthWord from './NthWord';

const Wrapper = styled.div`
    font-size: xx-large;
`;

class BackupProgressModelOne extends React.Component {
    startBackup = () => {
        console.warn('start backup here');
        this.props.connectActions.backupDevice();
    }

    isCheckingWords = () => this.props.deviceInteraction.counter - 24 > 0

    render() {
        const {
            device, deviceCall, deviceInteraction, onboardingActions,
        } = this.props;
        return (
            <StepWrapper>
                <StepHeadingWrapper />
                <StepBodyWrapper>
                    {
                        (device && device.features.needs_backup === true && deviceInteraction.counter === 0) && (
                            <React.Fragment>
                                <P>
                                    Now your device is going to show you 24 words to backup your wallet.
                                    Write them down. Do not disconnect device.
                                </P>
                                <ControlsWrapper>
                                    <Button
                                        isDisabled={deviceCall.isProgress}
                                        onClick={() => this.startBackup()}
                                    >
                                        Okey
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>

                        )
                    }

                    {
                        (device && device.features.needs_backup === true && deviceInteraction.counter > 0 && this.isCheckingWords()) && (
                            <Wrapper>
                                Check <br />
                                <NthWord number={deviceInteraction.counter - 24} /> <br />
                            </Wrapper>
                        )
                    }

                    {
                        (device && device.features.needs_backup === true && !this.isCheckingWords() && deviceInteraction.counter > 0) && (
                            <Wrapper>
                                Write down <br />
                                <NthWord number={deviceInteraction.counter} /> <br />
                                From your device to your recovery seed card.
                            </Wrapper>
                        )
                    }

                    {
                        device && device.features.needs_backup === false && (
                            <React.Fragment>
                                <P>
                                Good job.
                                </P>
                                <P>
                                Backup is now on your recovery seed card. Once again dont lose it and keep it private!
                                </P>
                                <ControlsWrapper>
                                    <Button onClick={() => onboardingActions.goToNextStep()}>My recovery card is safe</Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

BackupProgressModelOne.propTypes = {
    onboardingActions: types.onboardingActions,
    connectActions: types.connectActions,
    deviceCall: types.deviceCall,
    device: types.device,
    deviceInteraction: types.deviceInteraction,
};

export default BackupProgressModelOne;
