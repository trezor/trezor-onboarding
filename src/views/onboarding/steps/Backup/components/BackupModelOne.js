import React from 'react';
import styled from 'styled-components';
import { Button, P } from 'trezor-ui-components';
import { FormattedMessage } from 'react-intl';

import types from 'config/types';

import l10nMessages from './BackupModelOne.messages';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../../components/Wrapper';

import NthWord from './NthWord';

const Wrapper = styled.div`
    font-size: xx-large;
`;

class BackupProgressModelOne extends React.Component {
    startBackup = () => {
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
                                    <FormattedMessage {...l10nMessages.TR_BACKUP_INSTRUCTION} />
                                </P>
                                <ControlsWrapper>
                                    <Button
                                        isDisabled={deviceCall.isProgress}
                                        onClick={() => this.startBackup()}
                                    >
                                        <FormattedMessage {...l10nMessages.TR_BACKUP_OK} />
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>

                        )
                    }

                    {
                        (device && device.features.needs_backup === true && deviceInteraction.counter > 0 && this.isCheckingWords()) && (
                            <Wrapper>
                                <FormattedMessage {...l10nMessages.TR_CHECK_NTH_WORD} values={{ NthWord: <NthWord number={deviceInteraction.counter - 24} /> }} />
                            </Wrapper>
                        )
                    }

                    {
                        (device && device.features.needs_backup === true && !this.isCheckingWords() && deviceInteraction.counter > 0) && (
                            <Wrapper>
                                <FormattedMessage {...l10nMessages.TR_WRITE_DOWN_NTH_WORD} values={{ NthWord: <NthWord number={deviceInteraction.counter} /> }} />
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
