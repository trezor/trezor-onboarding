import React from 'react';
import {
    Button, P,
} from 'trezor-ui-components';

import types from 'config/types';
// import { ID } from 'views/onboarding/constants/steps';

import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../components/Wrapper';

const SecurityStep = ({ onboardingActions }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            Basic setup is done, but...
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <P>Good job, your wallet is ready. But we strongly recommend you to spend few more minutes and improve your security</P>
            <ControlsWrapper>
                <Button onClick={() => onboardingActions.goToNextStep()}>
                    Take me to security <br />
                    (5 minutes)
                </Button>
                <Button isWhite>Skip for now</Button>
            </ControlsWrapper>

        </StepBodyWrapper>
    </StepWrapper>
);

SecurityStep.propTypes = {
    onboardingActions: types.onboardingActions.isRequired,
};

export default SecurityStep;