import React from 'react';
import Proptypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import { render } from 'react-dom';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';

import { SM } from 'config/breakpoints';
import types from 'config/types';
import colors from 'config/colors';
import { ID } from 'constants/steps';

import ErrorBoundary from 'support/ErrorBoundary';
import GlobalWebNavigation from 'components/GlobalWebNavigation';

import BaseStyles from 'support/BaseStyles';
import ErrorLogService from 'support/ErrorLogService';
import IntlProvider from 'support/ConnectedIntlProvider';

import Onboarding from 'onboarding/Container';
import store from './configureStore';

ErrorLogService.init();

// eslint-disable-next-line no-undef
console.log(`[Trezor onboarding] version: ${VERSION}, branch: ${BRANCH}, build: ${BUILD}`);

// todo: consider for blocking back or reload button;
// window.onbeforeunload = function () { return 'Your work will be lost.'; };

const root = document.getElementById('root');


if (root) {
    render(
        // <React.StrictMode>
        <Provider store={store}>
            <React.Fragment>
                <Normalize />
                <BaseStyles />
                <IntlProvider>
                    <React.Fragment>
                        <GlobalWebNavigation />
                        <ErrorBoundary>
                            <Onboarding />
                        </ErrorBoundary>
                    </React.Fragment>
                    

                </IntlProvider>
            </React.Fragment>
        </Provider>,
        // {/* </React.StrictMode>, */}
        root // eslint-disable-line
    );
}