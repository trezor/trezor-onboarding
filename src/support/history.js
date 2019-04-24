import { createHashHistory } from 'history';
import { setStep } from 'actions/onboardingActions';
import store from 'configureStore';
import { ID } from 'constants/steps';

const history = createHashHistory({
    hashType: 'noslash',
    getUserConfirmation(message, callback) {
        console.warn('message', message);
        // Show some custom dialog to the user and call
        // callback(true) to continue the transiton, or
        // callback(false) to abort it.
    },
});

// Listen for changes to the current location.
history.listen((location, action) => {
    console.warn(location, action);
    const path = location.pathname.substring(1);
    if (action === 'POP' && Object.values(ID).includes(path)) {
        store.dispatch(setStep(path));
    }
});

export default history;