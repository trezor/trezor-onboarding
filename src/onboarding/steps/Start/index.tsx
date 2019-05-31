import React from 'react';
import ReactSVG from 'react-svg';
import { P, Button } from 'trezor-ui-components';
import { FormattedMessage } from 'react-intl';

import Text from 'components/Text';

import { OptionsList } from 'components/Options';
import * as STEP from 'constants/steps';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from 'components/Wrapper';
import { State } from 'types/redux';
import { OnboardingActions } from 'types/onboarding';
import { ConnectActions } from 'types/connect';
import { RecoveryActions } from 'types/recovery';
import Recovery from './components/Recovery';
import CreateImg from './images/create-2.svg';
import RecoverImg from './images/recover-2.svg';

import l10nMessages from './index.messages';

const StartOption = () => (
    <React.Fragment>
        <P><FormattedMessage {...l10nMessages.TR_START_FROM_SCRATCH} /></P>
        <ReactSVG svgStyle={{ width: '100%' }} src={CreateImg} />
    </React.Fragment>
);

const RecoverOption = () => (
    <React.Fragment>
        <P><FormattedMessage {...l10nMessages.TR_RECOVER} /></P>
        <ReactSVG svgStyle={{ width: '100%' }} src={RecoverImg} />
    </React.Fragment>
);

interface Props {
    isResolved: boolean,
    activeSubStep: State['onboarding']['activeSubStep'],
    recovery: State['recovery'],
    device: State['connect']['device'],
    uiInteraction: State['connect']['uiInteraction'],
    deviceCall: State['connect']['deviceCall'],
    recoveryActions: RecoveryActions;
    onboardingActions: OnboardingActions,
    connectActions: ConnectActions,
}

const StartStep = ({
    isResolved,
    onboardingActions,
    activeSubStep,
    recoveryActions,
    connectActions,
    recovery,
    device,
    uiInteraction,
    deviceCall,
}: Props) => (
    <StepWrapper>
        <StepHeadingWrapper>
            {
                activeSubStep === null && <FormattedMessage {...l10nMessages.TR_START_HEADING} />
            }
            {
                activeSubStep === STEP.ID_RECOVERY_STEP && <FormattedMessage {...l10nMessages.TR_RECOVERY_HEADING} />
            }
        </StepHeadingWrapper>
        <StepBodyWrapper>
            {/* todo: reconsider isResolved logic */}
            {
                !isResolved && activeSubStep === STEP.ID_RECOVERY_STEP && (
                    <Recovery
                        onboardingActions={onboardingActions}
                        recoveryActions={recoveryActions}
                        connectActions={connectActions}
                        recovery={recovery}
                        device={device}
                        uiInteraction={uiInteraction}
                        deviceCall={deviceCall}
                    />
                )
            }

            {
                !isResolved && activeSubStep === null && device!.features!.initialized !== true && (
                    <OptionsList
                        options={[{
                            content: <StartOption />,
                            value: STEP.ID_SECURITY_STEP,
                            key: 1,
                            onClick: () => {
                                connectActions.resetDevice();
                            },
                        }, {
                            content: <RecoverOption />,
                            value: STEP.ID_RECOVERY_STEP,
                            key: 2,
                            onClick: () => {
                                onboardingActions.goToSubStep(STEP.ID_RECOVERY_STEP);
                            },
                        }]}
                        selected={null}
                        selectedAccessor="value"
                    />
                )
            }

            {
                !isResolved && device!.features!.initialized === true && (
                    <React.Fragment>
                        {/* todo: translations */}
                        <Text>Device succesfully initialized. You can continue</Text>
                        <ControlsWrapper>
                            <Button onClick={() => onboardingActions.goToNextStep()}>Continue</Button>
                        </ControlsWrapper>
                    </React.Fragment>
                )
            }

            {
                isResolved && (
                    <React.Fragment>
                        {/* todo: translations */}
                        <Text>You have already created a new wallet from scratch or through recovery.</Text>
                        <ControlsWrapper>
                            <Button
                                data-test="button-continue"
                                onClick={() => onboardingActions.goToNextStep()}
                            >
                            Continue
                            </Button>
                        </ControlsWrapper>
                    </React.Fragment>
                )
            }
        </StepBodyWrapper>
    </StepWrapper>
);

export default StartStep;