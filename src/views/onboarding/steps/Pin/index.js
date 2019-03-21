import React from 'react';
import styled from 'styled-components';
import { UI } from 'trezor-connect';
import {
    P, Button, Link,
} from 'trezor-ui-components';

import { PIN_MANUAL_URL } from 'config/urls';
import types from 'config/types';

import PinMatrix from './components/PinMatrix';
import HowToSetPinGif from './videos/pin.gif';

import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../components/Wrapper';

const NewPinWrapper = styled.div`
    display: flex;
`;

const ImgWrapper = styled.div`
    margin: 20px 30px 0 30px;
    text-align: justify;
    max-width: 230px;
`;

const PinMatrixWrapper = styled.div`
    margin: 0 30px 0 30px;
    min-width: 260px;
`;

class SetPinStep extends React.Component {
    getStatus() {
        const { deviceCall, uiInteraction, device } = this.props;

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
        return null;
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    { this.getStatus() === 'initial' && 'PIN' }
                    { this.getStatus() === 'first' && 'Set new PIN' }
                    { this.getStatus() === 'second' && 'Repeat PIN' }
                    { this.getStatus() === 'success' && 'PIN enabled' }
                    { this.getStatus() === 'mismatched' && 'PIN mismatch' }
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        this.getStatus() === 'initial' && (
                            <React.Fragment>
                                <P>Protect device from unauthorized access by using a strong pin.</P>
                                <ControlsWrapper>
                                    <Button onClick={() => { this.props.connectActions.changePin(); }}>
                                    Set pin
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        this.getStatus() === 'first' && (
                            <NewPinWrapper>
                                <ImgWrapper>
                                    <P style={{ textAlign: 'justify' }}>
                                        In order to secure maximum security, we do not display pin on your computer. We will just show
                                        a &#34;blind matrix&#34;, real layout is displayed on your device.
                                    </P>
                                    <img src={HowToSetPinGif} alt="How to enter pin" width="200px" />
                                </ImgWrapper>

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
                                <P>
                                Good. You entered a new pin. But to make sure you did not make mistake, please enter it again. Look
                                at your device now, numbers are now different.
                                </P>
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
                                <P>Purfect! Your device is now secured by pin.</P>
                                <ControlsWrapper>
                                    <Button onClick={() => this.props.onboardingActions.goToNextStep()}>Continue</Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        this.getStatus() === 'mismatch' && (
                            <React.Fragment>
                                <P>Pin mismatch.</P>
                                <P>Are you confused, how PIN works? You can always refer to our</P>
                                <Link href={PIN_MANUAL_URL}>documentation</Link>
                                <ControlsWrapper>
                                    <Button onClick={() => { this.props.connectActions.changePin(); }}>Start again</Button>
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
    device: types.device,
    connectActions: types.connectActions.isRequired,
    onboardingActions: types.onboardingActions.isRequired,
    deviceCall: types.deviceCall.isRequired,
    uiInteraction: types.uiInteraction,
};

export default SetPinStep;