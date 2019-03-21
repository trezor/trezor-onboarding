import React from 'react';
import { render } from 'react-dom';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';

import BaseStyles from 'support/BaseStyles';
import ErrorLogService from 'support/ErrorLogService';

import App from 'views/Container';
import store from './configureStore';

ErrorLogService.init();

const root = document.getElementById('root');

// eslint-disable-next-line no-undef
console.log(`[Trezor onboarding] version: ${VERSION}, branch: ${BRANCH}, build: ${BUILD}`);

if (root) {
    render(
        <Provider store={store}>
            <React.Fragment>
                <Normalize />
                <BaseStyles />
                <App />
            </React.Fragment>
        </Provider>,
        root // eslint-disable-line
    );
}