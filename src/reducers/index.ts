import { combineReducers } from 'redux';

import onboarding from 'reducers/onboardingReducer';
import connect from 'reducers/connectReducer';
import fetch from 'reducers/fetchReducer';
import recovery from 'reducers/recoveryReducer';
import firmwareUpdate from 'reducers/firmwareUpdateReducer';
import newsletter from 'reducers/newsletterReducer';

export default combineReducers({
    connect,
    onboarding,
    fetch,
    recovery,
    firmwareUpdate,
    newsletter,
});