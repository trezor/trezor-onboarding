import React from 'react';
import {
    H1, P, Button, Input,
} from 'trezor-ui-components';
import styled from 'styled-components';

import types from 'config/types';
import { validateASCII } from 'utils/validate';

import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../components/Wrapper';

const InputWrapper = styled.div`
    display: flex;
    align-items: flex-start;
`;

class NameStep extends React.Component {
    constructor() {
        super();
        this.state = {
            label: '',
            labelChanged: false,
        };
    }

    changeLabel = async () => {
        const { label } = this.state;
        await this.props.connectActions.applySettings({ label });
        // call was successful
        if (this.props.deviceCall.result) {
            this.setState({ labelChanged: true });
        }
    }

    handleInputChange = (event) => {
        this.setState({ label: event.target.value });
    }

    validateInput = () => {
        if (!this.state.label) {
            return { state: '' };
        }
        if (!validateASCII(this.state.label)) {
            return { state: 'error', bottomText: 'name can contain only basic letters' };
        }
        if (this.state.label.length > 16) {
            return { state: 'error', bottomText: 'name is too long' };
        }
        return { state: 'success', bottomText: 'cool name' };
    }

    render() {
        const { device } = this.props;
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    {
                        !this.state.labelChanged && <H1>Name your device</H1>
                    }
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        !this.state.labelChanged && (
                            <React.Fragment>
                                <P>Personalize your device with your own name.</P>
                                <InputWrapper>
                                    <Input
                                        value={this.state.label}
                                        placeholder=""
                                        state={this.validateInput().state ? this.validateInput().state : null}
                                        bottomText={this.validateInput().bottomText ? this.validateInput().bottomText : ''}
                                        onChange={this.handleInputChange}
                                        isDisabled={this.props.deviceCall.isProgress}
                                    />
                                    <Button isDisabled={this.validateInput().state !== 'success'} onClick={this.changeLabel}>Submit</Button>
                                </InputWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        this.state.labelChanged && (
                            <React.Fragment>
                                <H1>Hi {device.features.label}!</H1>
                                <P>
                                Excellent, your device has a custom name now.
                                It will be visible on your device display from now on.
                                </P>
                                <ControlsWrapper>
                                    <Button onClick={() => this.props.onboardingActions.goToNextStep()}>Continue</Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

NameStep.propTypes = {
    connectActions: types.connectActions,
    onboardingActions: types.onboardingActions.isRequired,
    deviceCall: types.deviceCall.isRequired,
    device: types.deviceCall,
};

export default NameStep;