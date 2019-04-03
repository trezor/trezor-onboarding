import React from 'react';
import Proptypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import { hot } from 'react-hot-loader/root';

import types from 'config/types';
import colors from 'config/colors';
import Onboarding from 'views/onboarding/Container';
import ErrorBoundary from 'support/ErrorBoundary';
import IntlProvider from 'support/ConnectedIntlProvider';

import GlobalWebNavigation from 'components/GlobalWebNavigation';
import { ID } from 'views/onboarding/constants/steps';

const backgroundAnimation = keyframes`
    0% { background-color: ${colors.white} }
    100% { background-color: ${colors.gray} }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: ${colors.white};

    /*  todo: add constant  */
    
    @media only screen and (min-width: 600px) {
        ${props => (props.animate && css`animation: ${backgroundAnimation} 1s linear`)};
        background-color: ${props => (props.show ? colors.gray : colors.white)};
    }
`;

const exludedStepsForWrapper = [ID.WELCOME_STEP, ID.FINAL_STEP];

class App extends React.PureComponent {
    componentDidMount() {
        this.props.init();
    }

    render() {
        const { error, activeStepId, init } = this.props;
        return (
            <Wrapper animate={!exludedStepsForWrapper.includes(activeStepId)} show={!exludedStepsForWrapper.includes(activeStepId)}>
                <IntlProvider>
                    {/* here we pass error possibly caught outside render that would not be caught by ErrorBoundary otherwise */}
                    <React.Fragment>
                        <GlobalWebNavigation />
                        <ErrorBoundary error={error}>
                            <Onboarding />
                        </ErrorBoundary>
                    </React.Fragment>
                </IntlProvider>
            </Wrapper>
        );
    }
}

App.propTypes = {
    error: Proptypes.object,
    activeStepId: types.activeStepId,
};

export default hot(App);