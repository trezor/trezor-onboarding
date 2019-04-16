import { createBrowserHistory } from 'history';
import { setStep } from 'actions/onboardingActions';
import store from 'configureStore';

console.warn('store', store);
const history = createBrowserHistory();

// Listen for changes to the current location.
history.listen((location, action) => {
    // location is an object like window.location
    console.log(action, location.pathname, location.state);
    if (action === 'POP' && location.state && location.state.stepId) {
        console.warn('j');
        store.dispatch(setStep(location.state.stepId));
    }
});

// Use push, replace, and go to navigate around.
// history.push('/home', { some: 'state' });

// To stop listening, call the function returned from listen().
// unlisten();

export default history;