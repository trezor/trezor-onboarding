import React from 'react';
import { render } from 'react-dom';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';

import ErrorBoundary from 'support/ErrorBoundary';
import BaseStyles from 'support/BaseStyles';
import ErrorLogService from 'support/ErrorLogService';
import IntlProvider from 'support/ConnectedIntlProvider.tsx';

import GlobalWebNavigation from 'components/GlobalWebNavigation';
import Onboarding from 'onboarding/Container';

import store from './configureStore';

ErrorLogService.init();

// eslint-disable-next-line no-undef
// console.log(`[Trezor onboarding] version: ${VERSION}, branch: ${BRANCH}, build: ${BUILD}`);

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