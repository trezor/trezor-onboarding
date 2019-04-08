import {
    GO_TO_NEXT_STEP,
    GO_TO_SUBSTEP,
    GO_TO_PREVIOUS_STEP,
    SELECT_TREZOR_MODEL,
    SET_STEPS,
    SET_APPLICATION_ERROR,
    SET_LOCALIZATION,
    TOGGLE_DOWNLOAD_CLICKED,
} from 'actions/constants/onboarding';
import { ID } from 'views/onboarding/constants/steps';
import steps from 'views/onboarding/config/steps';

const initialState = {
    selectedModel: 1,
    activeStepId: ID.WELCOME_STEP,
    activeSubStep: null,
    steps, // todo: move here directly probably for better readability
    language: 'en',
    messages: {},
    downloadClicked: false,
};

const onboarding = (state = initialState, action) => {
    switch (action.type) {
        case GO_TO_NEXT_STEP:
            return {
                ...state,
                activeStepId: action.stepId,
                activeSubStep: null,
                downloadClicked: false,
            };
        case GO_TO_SUBSTEP:
            return {
                ...state,
                activeSubStep: action.subStepId,
            };
        case GO_TO_PREVIOUS_STEP:
            return {
                ...state,
                activeStepId: action.stepId,
                activeSubStep: null,
                downloadClicked: false,
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
        case TOGGLE_DOWNLOAD_CLICKED: {
            return {
                ...state,
                downloadClicked: !state.downloadClicked,
            };
        }
        default:
            return state;
    }
};

export default onboarding;