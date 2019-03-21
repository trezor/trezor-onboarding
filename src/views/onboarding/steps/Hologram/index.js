import React from 'react';
import styled from 'styled-components';
import {
    Button, P, Link,
} from 'trezor-ui-components';

import { TREZOR_RESELLERS_URL, SUPPORT_URL } from 'config/urls';
import types from 'config/types';

import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from '../../components/Wrapper';
import Hologram from './components/Hologram';

const HologramWrapper = styled.div`
    width: 70%;
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
                    { status === 'initial' && 'Please make sure the hologram on the box is authentic'}
                    { status === 'hologram-different' && 'My hologram looks different' }
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        status !== 'hologram-different' && (
                            <React.Fragment>
                                <HologramWrapper>
                                    <Hologram model={this.props.model} />
                                </HologramWrapper>

                                <ControlsWrapper>
                                    <Button onClick={() => this.props.onboardingActions.goToNextStep()}>My hologram is OK</Button>
                                    <Button onClick={() => this.setState({ status: 'hologram-different' })} isWhite>
                                        My hologram looks different
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        status === 'hologram-different' && (
                            <React.Fragment>
                                <P>Did you purchase your device from <Link href={TREZOR_RESELLERS_URL}>a trusted reseller</Link>?
                                If no, device you are holding in hands might be a counterfeit. Please <Link href={SUPPORT_URL}>contact our support</Link>
                                </P>
                                <ControlsWrapper>
                                    <Button isWhite onClick={() => this.setState({ status: 'initial' })}>Back</Button>
                                    <Link href={SUPPORT_URL}>
                                        <Button>Contact support</Button>
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