import React from 'react';
import {
    Button, P,
} from 'trezor-ui-components';
import { FormattedMessage } from '@dragonraider5/react-intl';
import types from 'config/types';

import { ID } from 'views/onboarding/constants/steps';
import l10nMessages from './index.messages';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../components/Wrapper';

const SecurityStep = ({ onboardingActions }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <FormattedMessage {...l10nMessages.TR_SECURITY_HEADING} />
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <P>
                <FormattedMessage {...l10nMessages.TR_SECURITY_SUBHEADING} />
            </P>
            <ControlsWrapper>
                <Button onClick={() => onboardingActions.goToNextStep()}>
                    <FormattedMessage {...l10nMessages.TR_GO_TO_SECURITY} />
                </Button>
                <Button isWhite onClick={() => onboardingActions.goToNextStep(ID.FINAL_STEP)}>
                    <FormattedMessage {...l10nMessages.TR_SKIP_SECURITY} />
                </Button>
            </ControlsWrapper>
        </StepBodyWrapper>
    </StepWrapper>
);

SecurityStep.propTypes = {
    onboardingActions: types.onboardingActions.isRequired,
};

export default SecurityStep;