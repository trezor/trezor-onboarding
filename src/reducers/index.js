/* @flow */
import { combineReducers } from 'redux';

import onboarding from 'reducers/onboardingReducer';
import connect from 'reducers/connectReducer';
import fetch from 'reducers/fetchReducer';

export default combineReducers({
    onboarding,
    connect,
    fetch,
});