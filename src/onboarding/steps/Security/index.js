import React from 'react';
import { Button } from 'trezor-ui-components';
import { FormattedMessage } from 'react-intl';
import types from 'config/proptypes';
import { ID } from 'constants/steps';
import Text from 'components/Text';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from 'components/Wrapper';

import l10nMessages from './index.messages';

const SecurityStep = ({ onboardingActions }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <FormattedMessage {...l10nMessages.TR_SECURITY_HEADING} />
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <Text>
                <FormattedMessage {...l10nMessages.TR_SECURITY_SUBHEADING} />
            </Text>
            <ControlsWrapper>
                <Button isWhite onClick={() => onboardingActions.goToNextStep(ID.FINAL_STEP)}>
                    <FormattedMessage {...l10nMessages.TR_SKIP_SECURITY} />
                </Button>
                <Button onClick={() => {
                    onboardingActions.goToNextStep();
                }}
                >
                    <FormattedMessage {...l10nMessages.TR_GO_TO_SECURITY} />
                </Button>
            </ControlsWrapper>
        </StepBodyWrapper>
    </StepWrapper>
);

SecurityStep.propTypes = {
    onboardingActions: types.onboardingActions.isRequired,
};

export default SecurityStep;