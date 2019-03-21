import React from 'react';
import styled from 'styled-components';
import Proptypes from 'prop-types';
import ReactTimeout from 'react-timeout';
import { Button, H1, P } from 'trezor-ui-components';

import types from 'config/types';
import { Dots } from 'components/Loaders';
import { ControlsWrapper } from 'views/onboarding/components/Wrapper';

const ANIMATION_DURATION = 4;

const Logo = styled.svg`
    display: block;
    margin: 0 auto;
    width: 200px;
    height: 200px;
    opacity: 1;
    & .path {
        animation: animation ${ANIMATION_DURATION}s ease-in;
    }
    
    @keyframes animation {
        from { stroke-dasharray: 30 30}
        to { stroke-dasharray: 30 0}
    } 
`;

const Loader = styled(P)`
    text-align: center;
`;

const FadeInWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: fadeIn 0.5s linear;
    text-align: center;
    & * {
        margin: 20px;
    }
    
    @keyframes fadeIn { 
        from { opacity: 0  }
        to { opacity: 1}
    }
`;

class WelcomeStep extends React.Component {
    constructor() {
        super();
        this.state = {
            status: 'initial',
        };
    }


    componentDidMount() {
        this.props.setTimeout(() => {
            this.setState({ status: 'animation-finished' });
        }, ANIMATION_DURATION * 1000);
    }

    render() {
        const { status } = this.state;
        return (
            <React.Fragment>
                <Logo viewBox="30 8 60 30" enableBackground="new 0 0 340 333">
                    <path
                        className="path"
                        fill="#FFFFFF"
                        stroke="#000000"
                        strokeWidth="0.4"
                        d="M70.3,14.2v-3.5c0-5.9-5-10.7-11.2-10.7c-6.2,0-11.2,4.8-11.2,10.7v3.5h-4.6v24.6h0l15.9,7.4l15.9-7.4h0V14.2H70.3z
                        M53.6,10.7c0-2.7,2.5-5,5.5-5c3,0,5.5,2.2,5.5,5v3.5H53.6V10.7z M68.6,34.7l-9.5,4.4l-9.5-4.4V20h19V34.7z"
                    />
                </Logo>


                {
                    status !== 'animation-finished' && <Loader>Loading<Dots maxCount={3} /></Loader>
                }

                {
                    status === 'animation-finished' && this.props.transport === null && (
                        <Loader>Setting up communication<Dots maxCount={3} /></Loader>
                    )
                }

                {
                    status === 'animation-finished' && this.props.transport !== null && (
                        <FadeInWrapper>
                            <H1>Welcome to Trezor</H1>
                            <ControlsWrapper>
                                <Button onClick={() => this.props.onboardingActions.goToNextStep()}>
                                Get started (5 minutes)
                                </Button>
                            </ControlsWrapper>

                        </FadeInWrapper>
                    )
                }
            </React.Fragment>
        );
    }
}

WelcomeStep.propTypes = {
    onboardingActions: types.onboardingActions.isRequired,
    setTimeout: Proptypes.func.isRequired,
    transport: types.transport,
};

export default ReactTimeout(WelcomeStep);