import React from 'react';
import Proptypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import { hot } from 'react-hot-loader/root';

import colors from 'config/colors';
import Onboarding from 'views/onboarding/Container';
// todo [vladimir]: really support? Used trezor-wallet approach here
import ErrorBoundary from 'support/ErrorBoundary';
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
    background-color: ${props => (props.show ? colors.gray : colors.white)};
    ${props => (props.animate && css`animation: ${backgroundAnimation} 1s linear`)};
`;

const exludedStepsForWrapper = [ID.WELCOME_STEP, ID.FINAL_STEP];

const App = ({ error, activeStep }) => (
    <Wrapper animate={!exludedStepsForWrapper.includes(activeStep)} show={!exludedStepsForWrapper.includes(activeStep)}>
        {/* here we pass error possibly caught outside render that would not be caught by ErrorBoundary otherwise */}
        <GlobalWebNavigation />
        <ErrorBoundary error={error}>
            <Onboarding />
        </ErrorBoundary>
    </Wrapper>
);

App.propTypes = {
    error: Proptypes.object,
    activeStep: Proptypes.string.isRequired,
};

export default hot(App);