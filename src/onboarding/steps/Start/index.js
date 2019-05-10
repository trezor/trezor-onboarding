import React from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import { P, Button } from 'trezor-ui-components';
import { FormattedMessage } from 'react-intl';

import Text from 'components/Text';

import types from 'config/proptypes';
import { OptionsList } from 'components/Options';
import { ID } from 'constants/steps';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from 'components/Wrapper';

import Recovery from './components/Recovery';
import CreateImg from './images/create-2.svg';
import RecoverImg from './images/recover-2.svg';

import l10nMessages from './index.messages';

const StartOption = () => (
    <React.Fragment>
        <P><FormattedMessage {...l10nMessages.TR_START_FROM_SCRATCH} /></P>
        <ReactSVG svgStyle={{ width: '100%' }} src={CreateImg} alt="create new wallet" />
    </React.Fragment>
);

const RecoverOption = () => (
    <React.Fragment>
        <P><FormattedMessage {...l10nMessages.TR_RECOVER} /></P>
        <ReactSVG svgStyle={{ width: '100%' }} src={RecoverImg} alt="recover wallet from seed" />
    </React.Fragment>
);

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
}) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <FormattedMessage {...l10nMessages.TR_START_HEADING} />
        </StepHeadingWrapper>
        <StepBodyWrapper>
            {/* todo: reconsider isResolved logic */}
            {
                !isResolved && activeSubStep === ID.RECOVERY_STEP && (
                    <Recovery
                        onboardingActions={onboardingActions}
                        activeSubStep={activeSubStep}
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
                !isResolved && activeSubStep === null && device.features.initialized !== true && (
                    <OptionsList
                        options={[{
                            content: <StartOption />,
                            value: ID.SECURITY_STEP,
                            key: 1,
                            onClick: () => {
                                connectActions.resetDevice();
                            },
                        }, {
                            content: <RecoverOption />,
                            value: ID.RECOVERY_STEP,
                            key: 2,
                            onClick: () => {
                                onboardingActions.goToSubStep(ID.RECOVERY_STEP);
                            },
                        }]}
                        selected={null}
                        selectedAccessor="value"
                    />
                )
            }

            {
                !isResolved && device.features.initialized === true && (
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

StartStep.propTypes = {
    isResolved: PropTypes.bool.isRequired, // todo: might be removed later. if not, move to types;
    activeSubStep: types.activeSubStep,
    recoveryActions: types.recoveryActions.isRequired,
    recovery: types.recovery.isRequired,
    connectActions: types.connectActions.isRequired,
    onboardingActions: types.onboardingActions.isRequired,
    deviceCall: types.deviceCall.isRequired,
    uiInteraction: types.uiInteraction.isRequired,
    device: types.device,
};

export default StartStep;