import {
    GO_TO_NEXT_STEP,
    GO_TO_PREVIOUS_STEP,
    SELECT_TREZOR_MODEL,
    SET_STEPS,
    SET_APPLICATION_ERROR,
    SET_LOCALIZATION,
} from 'actions/constants/onboarding';
import { ID } from 'views/onboarding/constants/steps';
import steps from 'views/onboarding/config/steps';

const initialState = {
    selectedModel: 1,
    activeStep: ID.WELCOME_STEP,
    steps, // todo: move here directly probably for better readability
    language: 'en',
    messages: {},
};

const onboarding = (state = initialState, action) => {
    switch (action.type) {
        case GO_TO_NEXT_STEP:
            return {
                ...state,
                activeStep: action.stepId,
            };
        case GO_TO_PREVIOUS_STEP:
            return {
                ...state,
                activeStep: action.stepId,
            };
        case SELECT_TREZOR_MODEL:
            return {
                ...state,
                selectedModel: action.model,
            };
        case SET_STEPS:
            return {
                ...state,
                steps: action.steps,
            };
        case SET_APPLICATION_ERROR: {
            return {
                ...state,
                error: action.error,
            };
        }
        case SET_LOCALIZATION: {
            return {
                ...state,
                language: action.language,
                messages: action.messages,
            };
        }
        default:
            return state;
    }
};

export default onboarding;