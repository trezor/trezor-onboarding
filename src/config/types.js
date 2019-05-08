import PropTypes from 'prop-types';
import { ID, TITLE, DISALLOWED_STATE } from 'constants/steps';
import languages from 'config/languages';

const step = PropTypes.shape({
    id: PropTypes.oneOf([...Object.values(ID)]),
    title: PropTypes.oneOf([...Object.values(TITLE)]),
    disdisallowedDeviceStates: PropTypes.arrayOf(PropTypes.oneOf([...Object.values(DISALLOWED_STATE)])),
});

export default {
    // connectReducer
    device: PropTypes.object,
    prevDeviceId: PropTypes.string,
    transport: PropTypes.object,
    deviceCall: PropTypes.shape({
        name: PropTypes.string,
        isProgress: PropTypes.bool,
        error: PropTypes.string,
        result: PropTypes.shape({
            message: PropTypes.string,
        }),
    }),
    deviceInteraction: PropTypes.shape({
        name: PropTypes.string,
        counter: PropTypes.number,
    }),
    uiInteraction: PropTypes.shape({
        name: PropTypes.string,
        counter: PropTypes.number,
    }),
    connectError: PropTypes.string,
    connectActions: PropTypes.objectOf(PropTypes.func), // todo: name all functions

    // onboardingReducer
    selectedModel: PropTypes.oneOf([1, 2]),
    activeStepId: PropTypes.oneOf([
        ...Object.values(ID),
    ]),
    activeSubStep: PropTypes.string,
    language: PropTypes.oneOf([
        ...Object.values(languages).map(lang => lang.code),
    ]),
    messages: PropTypes.object, // todo: better,
    step,
    steps: PropTypes.arrayOf(step),
    onboardingActions: PropTypes.objectOf(PropTypes.func), // todo: name all functions

    // fetchReducer
    fetchCall: PropTypes.shape({
        name: PropTypes.string,
        isProgress: PropTypes.bool,
        error: PropTypes.any,
        result: PropTypes.object,
    }),
    fetchActions: PropTypes.objectOf(PropTypes.func),

    // newsletterReducer
    newsletter: PropTypes.shape({
        email: PropTypes.string,
        skipped: PropTypes.bool.isRequired,
        checkboxes: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.bool.isRequired,
            label: PropTypes.string.isRequired,
        })),
    }),
    newsletterActions: PropTypes.objectOf(PropTypes.func),

    // recoveryReducer
    recovery: PropTypes.shape({
        word: PropTypes.string,
        advancedRecovery: PropTypes.bool.isRequired,
        wordsCount: PropTypes.oneOf([12, 18, 24]),
    }),
    recoveryActions: PropTypes.objectOf(PropTypes.func),

    // firmwareReducer
    firmwareUpdate: PropTypes.shape({
        progress: PropTypes.number,
    }),
    firmwareUpdateActions: PropTypes.objectOf(PropTypes.func),

    // utils types
    model: PropTypes.oneOf([1, 2]),
};