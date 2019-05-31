import React from 'react';
import * as Sentry from '@sentry/browser';
import { render } from 'react-dom';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';

import * as CONFIG from 'config/sentry';
import { isDevelopment } from 'support/build';

import ErrorBoundary from 'support/ErrorBoundary';
import BaseStyles from 'support/BaseStyles';
import IntlProvider from 'support/ConnectedIntlProvider';

import Onboarding from 'onboarding/Container';
import GlobalWebNavigation from './components/GlobalWebNavigation';

import store from './configureStore';

if (!isDevelopment) {
    Sentry.init({
        dsn: CONFIG.URL,
    });
}

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