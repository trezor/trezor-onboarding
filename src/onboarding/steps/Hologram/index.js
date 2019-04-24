import React from 'react';
import styled from 'styled-components';
import {
    Button, Link,
} from 'trezor-ui-components';
import { FormattedMessage } from '@dragonraider5/react-intl';

import { TREZOR_RESELLERS_URL, SUPPORT_URL } from 'config/urls';
import types from 'config/types';
import { MD } from 'config/breakpoints';

import Text from 'components/Text';
import l10nCommonMessages from 'support/commonMessages';

import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from 'components/Wrapper';

import l10nMessages from './index.messages';
import Hologram from './components/Hologram';

const HologramWrapper = styled.div`
    max-width: 500px;
    margin: 10px;

    @media only screen and (min-width: ${MD}px) {
        width: 70%;
    } 
`;

const HologramStep = ({ onboardingActions, activeSubStep, model }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <FormattedMessage {...l10nMessages.TR_HOLOGRAM_STEP_HEADING} />
        </StepHeadingWrapper>
        <StepBodyWrapper>
            {
                activeSubStep !== 'hologram-different' && (
                    <React.Fragment>
                        <Text>
                            <FormattedMessage {...l10nMessages.TR_HOLOGRAM_STEP_SUBHEADING} />
                        </Text>
                        <HologramWrapper>
                            <Hologram model={model} />
                        </HologramWrapper>
                        <ControlsWrapper>
                            <Button onClick={() => onboardingActions.goToNextStep()}>
                                <FormattedMessage {...l10nMessages.TR_HOLOGRAM_STEP_ACTION_OK} />
                            </Button>
                            <Button onClick={() => onboardingActions.goToSubStep('hologram-different')} isWhite>
                                <FormattedMessage {...l10nMessages.TR_HOLOGRAM_STEP_ACTION_NOT_OK} />
                            </Button>
                        </ControlsWrapper>
                    </React.Fragment>
                )
            }
            {
                activeSubStep === 'hologram-different' && (
                    <React.Fragment>
                        <Text>
                            <FormattedMessage
                                {...l10nMessages.TR_DID_YOU_PURCHASE}
                                values={{
                                    TR_RESELLERS_LINK: <Link href={TREZOR_RESELLERS_URL}><FormattedMessage {...l10nMessages.TR_RESELLERS_LINK} /></Link>,
                                    TR_CONTACT_OUR_SUPPORT_LINK: <Link href={SUPPORT_URL}><FormattedMessage {...l10nMessages.TR_CONTACT_OUR_SUPPORT_LINK} /></Link>,
                                }}
                            />
                        </Text>
                        <ControlsWrapper>
                            <Link href={SUPPORT_URL}>
                                <Button style={{ width: '100%' }}>
                                    <FormattedMessage {...l10nCommonMessages.TR_CONTACT_SUPPORT} />
                                </Button>
                            </Link>
                            <Button isWhite onClick={() => onboardingActions.goToSubStep(null)}>Back</Button>
                        </ControlsWrapper>
                    </React.Fragment>
                )
            }
        </StepBodyWrapper>
    </StepWrapper>
);

HologramStep.propTypes = {
    onboardingActions: types.onboardingActions,
    model: types.model,
    activeSubStep: types.activeSubStep,
};


export default HologramStep;