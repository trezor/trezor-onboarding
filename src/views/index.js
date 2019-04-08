import React from 'react';
import Proptypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import { hot } from 'react-hot-loader/root';

import { SM } from 'config/breakpoints';
import types from 'config/types';
import colors from 'config/colors';
import Onboarding from 'views/onboarding/Container';
import ErrorBoundary from 'support/ErrorBoundary';
import IntlProvider from 'support/ConnectedIntlProvider';
import isChrome from 'utils/isChrome';

import DownloadArrow from 'components/DownloadArrow';
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

    @media only screen and (min-width: ${SM}px) {
        ${props => (props.animate && css`animation: ${backgroundAnimation} 1s linear`)};
        background-color: ${props => (props.show ? colors.gray : colors.white)};
    }
`;

const DownloadArrowWrapper = styled.div`
    width: calc(21vw - 55px);
    height: calc(30vh - 81px);
    bottom: 20px;
    left: 17px;
    overflow: hidden;
    position: absolute;
    z-index: 0;
    display: none;

    @media only screen and (min-width: ${SM}px) {
        display: block;
    }
`;


const exludedStepsForWrapper = [ID.WELCOME_STEP, ID.FINAL_STEP];

class App extends React.PureComponent {
    componentDidMount() {
        this.props.init();
    }

    render() {
        const { error, activeStepId, downloadClicked } = this.props;
        return (
            <React.Fragment>
                <Wrapper animate={!exludedStepsForWrapper.includes(activeStepId)} show={!exludedStepsForWrapper.includes(activeStepId)}>
                    <IntlProvider>
                        {/* here we pass error possibly caught outside render that would not be caught by ErrorBoundary otherwise */}
                        <React.Fragment>
                            <GlobalWebNavigation />
                            <ErrorBoundary error={error}>
                                <Onboarding />
                                {
                                    downloadClicked && isChrome(navigator) && <DownloadArrowWrapper><DownloadArrow /></DownloadArrowWrapper>
                                }
                            </ErrorBoundary>
                        </React.Fragment>
                    </IntlProvider>
                </Wrapper>


            </React.Fragment>
        );
    }
}

App.propTypes = {
    error: Proptypes.object,
    activeStepId: types.activeStepId,
};

export default hot(App);