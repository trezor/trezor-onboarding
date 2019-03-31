import { combineReducers } from 'redux';

import onboarding from 'reducers/onboardingReducer';
import connect from 'reducers/connectReducer';
import fetch from 'reducers/fetchReducer';
import recovery from 'reducers/recoveryReducer';

export default combineReducers({
    onboarding,
    connect,
    fetch,
    recovery,
});