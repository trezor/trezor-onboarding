import React from 'react';
import styled from 'styled-components';
import { UI } from 'trezor-connect';
import {
    Button, Link,
} from 'trezor-ui-components';
import { FormattedMessage } from '@dragonraider5/react-intl';

import { PIN_MANUAL_URL } from 'config/urls';
import types from 'config/types';
import * as BREAKPOINTS from 'config/breakpoints';
import l10nCommonMessages from 'support/commonMessages';
import PinMatrix from 'components/PinMatrix';
import Text from 'components/Text';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from 'components/Wrapper';

import l10nMessages from './index.messages';
import HowToSetPinGif from './videos/pin.gif';

const NewPinWrapper = styled.div`
    display: flex;
    flex-direction: column-reverse;

    @media only screen and (min-width: ${BREAKPOINTS.SM}px) {
        flex-direction: row;
    } 
`;

const ImgWrapper = styled.div`
    margin: 10px 30px 30px 30px;
    max-width: 230px;
`;

const PinMatrixWrapper = styled.div`
    margin: 0 30px 0 30px;
    min-width: 260px;
`;

class SetPinStep extends React.Component {
    getStatus() {
        const {
            deviceCall, uiInteraction, device, activeSubStep,
        } = this.props;
        if (activeSubStep) {
            return activeSubStep;
        }
        if (deviceCall.error === 'PIN mismatch') {
            return 'mismatch';
        } if (uiInteraction.name === UI.REQUEST_PIN && uiInteraction.counter === 1) {
            return 'first';
        } if (uiInteraction.name === UI.REQUEST_PIN && uiInteraction.counter === 2) {
            return 'second';
        } if (device && device.features.pin_protection && !deviceCall.isProgress) {
            return 'success';
        } if (device && !device.features.pin_protection && !deviceCall.isProgress) {
            return 'initial';
        }
        // todo: what if device disconnects?
        return null;
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    { this.getStatus() === 'initial' && 'PIN' }
                    { this.getStatus() === 'tutorial' && 'PIN tutorial' }
                    { this.getStatus() === 'first' && <FormattedMessage {...l10nMessages.TR_PIN_HEADING_FIRST} /> }
                    { this.getStatus() === 'second' && <FormattedMessage {...l10nMessages.TR_PIN_HEADING_REPEAT} /> }
                    { this.getStatus() === 'success' && <FormattedMessage {...l10nMessages.TR_PIN_HEADING_SUCCESS} /> }
                    { this.getStatus() === 'mismatch' && <FormattedMessage {...l10nMessages.TR_PIN_HEADING_MISMATCH} /> }
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        this.getStatus() === 'initial' && (
                            <React.Fragment>
                                <Text>
                                    <FormattedMessage {...l10nMessages.TR_PIN_SUBHEADING} />
                                </Text>
                                <ControlsWrapper>
                                    <Button onClick={() => { this.props.connectActions.changePin(); }}>
                                        <FormattedMessage {...l10nMessages.TR_SET_PIN} />
                                    </Button>
                                    <Button isWhite onClick={() => this.props.onboardingActions.goToSubStep('tutorial')}>
                                        PIN tutorial
                                    </Button>
                                    <Button isWhite onClick={() => this.props.onboardingActions.goToNextStep()}>
                                        <FormattedMessage {...l10nCommonMessages.TR_SKIP} />
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        this.getStatus() === 'tutorial' && (
                            <React.Fragment>
                                <Text>
                                    <FormattedMessage {...l10nMessages.TR_PIN_ENTERING_DESCRIPTION} />
                                </Text>

                                <ImgWrapper>
                                    <img src={HowToSetPinGif} alt="How to enter pin" width="200px" />
                                </ImgWrapper>

                                <ControlsWrapper>
                                    <Button onClick={() => { this.props.onboardingActions.goToSubStep(null); this.props.connectActions.changePin(); }}>
                                        I get it, set PIN now
                                    </Button>
                                    <Button isWhite onClick={() => this.props.onboardingActions.goToNextStep()}>
                                        <FormattedMessage {...l10nCommonMessages.TR_SKIP} />
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        this.getStatus() === 'first' && (
                            <NewPinWrapper>
                                <PinMatrixWrapper>
                                    <PinMatrix
                                        onPinSubmit={
                                            (pin) => {
                                                this.props.connectActions.submitNewPin({ pin });
                                            }
                                        }
                                    />
                                </PinMatrixWrapper>
                            </NewPinWrapper>
                        )
                    }

                    {
                        this.getStatus() === 'second' && (
                            <React.Fragment>
                                <Text>
                                    <FormattedMessage {...l10nMessages.TR_FIRST_PIN_ENTERED} />
                                </Text>
                                <PinMatrix
                                    onPinSubmit={
                                        (pin) => {
                                            this.props.connectActions.submitNewPin({ pin });
                                        }
                                    }
                                />
                            </React.Fragment>
                        )
                    }

                    {
                        this.getStatus() === 'success' && (
                            <React.Fragment>
                                <Text>
                                    <FormattedMessage {...l10nMessages.TR_PIN_SET_SUCCESS} />
                                </Text>
                                <ControlsWrapper>
                                    <Button onClick={() => this.props.onboardingActions.goToNextStep()}>
                                        <FormattedMessage {...l10nCommonMessages.TR_CONTINUE} />
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        this.getStatus() === 'mismatch' && (
                            <React.Fragment>
                                <Text>
                                    <FormattedMessage
                                        {...l10nMessages.TR_PIN_ERROR_TROUBLESHOOT}
                                        values={{
                                            TR_DOCUMENTATION: (
                                                <Link href={PIN_MANUAL_URL}>
                                                    <FormattedMessage {...l10nMessages.TR_DOCUMENTATION} />
                                                </Link>),
                                        }}
                                    />
                                </Text>

                                <ControlsWrapper>
                                    <Button onClick={() => { this.props.connectActions.changePin(); }}>
                                        <FormattedMessage {...l10nMessages.TR_START_AGAIN} />
                                    </Button>
                                    <Button isWhite onClick={() => this.props.onboardingActions.goToSubStep('tutorial')}>
                                        PIN tutorial
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

SetPinStep.propTypes = {
    activeSubStep: types.activeSubStep,
    device: types.device,
    connectActions: types.connectActions.isRequired,
    onboardingActions: types.onboardingActions.isRequired,
    deviceCall: types.deviceCall.isRequired,
    uiInteraction: types.uiInteraction,
};

export default SetPinStep;