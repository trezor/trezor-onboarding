import React from 'react';
import styled from 'styled-components';
import {
    Button, P, Link,
} from 'trezor-ui-components';
import { FormattedMessage } from 'react-intl';

import { TREZOR_RESELLERS_URL, SUPPORT_URL } from 'config/urls';
import types from 'config/types';

import l10nCommonMessages from 'support/commonMessages';
import l10nMessages from './index.messages';

import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from '../../components/Wrapper';
import Hologram from './components/Hologram';

const HologramWrapper = styled.div`
    width: 70%;
    margin: 10px;
`;

class HologramStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'initial',
        };
    }

    render() {
        const { status } = this.state;
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <FormattedMessage {...l10nMessages.TR_HOLOGRAM_STEP_HEADING} />
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        status !== 'hologram-different' && (
                            <React.Fragment>
                                <P>
                                    <FormattedMessage {...l10nMessages.TR_HOLOGRAM_STEP_SUBHEADING} />
                                </P>
                                <HologramWrapper>
                                    <Hologram model={this.props.model} />
                                </HologramWrapper>

                                <ControlsWrapper>
                                    <Button onClick={() => this.props.onboardingActions.goToNextStep()}>
                                        <FormattedMessage {...l10nMessages.TR_HOLOGRAM_STEP_ACTION_OK} />
                                    </Button>
                                    <Button onClick={() => this.setState({ status: 'hologram-different' })} isWhite>
                                        <FormattedMessage {...l10nMessages.TR_HOLOGRAM_STEP_ACTION_NOT_OK} />
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        status === 'hologram-different' && (
                            <React.Fragment>
                                <P>
                                    {/* todo: translation */}
                                Did you purchase your device from <Link href={TREZOR_RESELLERS_URL}>a trusted reseller</Link>?
                                If no, device you are holding in hands might be a counterfeit.
                                Please <Link href={SUPPORT_URL}>contact our support</Link>
                                </P>
                                <ControlsWrapper>
                                    <Button isWhite onClick={() => this.setState({ status: 'initial' })}>Back</Button>
                                    <Link href={SUPPORT_URL}>
                                        <Button>
                                            <FormattedMessage {...l10nCommonMessages.TR_CONTACT_SUPPORT} />
                                        </Button>
                                    </Link>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

HologramStep.propTypes = {
    onboardingActions: types.onboardingActions,
    model: types.model,
};


export default HologramStep;