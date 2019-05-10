import { combineReducers } from 'redux';

import onboarding from 'reducers/onboardingReducer.ts';
import connect from 'reducers/connectReducer';
import fetch from 'reducers/fetchReducer';
import recovery from 'reducers/recoveryReducer';
import firmwareUpdate from 'reducers/firmwareUpdateReducer';
import newsletter from 'reducers/newsletterReducer';

export default combineReducers({
    onboarding,
    connect,
    fetch,
    recovery,
    firmwareUpdate,
    newsletter,
});