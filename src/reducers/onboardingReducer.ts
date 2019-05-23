import {
    Step,
    OnboardingReducer,
    OnboardingActionTypes,
    SET_STEP_ACTIVE,
    SET_STEP_RESOLVED,
    GO_TO_SUBSTEP,
    SELECT_TREZOR_MODEL,
    SET_APPLICATION_ERROR,
    SET_LOCALIZATION,
    // @ts-ignore
} from 'types/onboarding.ts';

import { ID, TITLE, DISALLOWED_STATE } from 'constants/steps';

const initialState: OnboardingReducer = {
    selectedModel: null,
    activeStepId: ID.WELCOME_STEP,
    activeSubStep: null,
    language: 'en',
    messages: {},
    steps: [
        {
            id: ID.WELCOME_STEP,
            visited: true,
        },
        {
            id: ID.SELECT_DEVICE_STEP,
            title: TITLE.SELECT_DEVICE_STEP,
        },
        {
            id: ID.UNBOXING_STEP,
            title: TITLE.UNBOXING_STEP,
        },
        {
            id: ID.BRIDGE_STEP,
            title: TITLE.BRIDGE_STEP,
        },
        {
            id: ID.CONNECT_STEP,
            title: TITLE.BRIDGE_STEP,
            disallowedDeviceStates: [
                DISALLOWED_STATE.DEVICE_IS_NOT_USED_HERE,
            ],
        },
        {
            id: ID.FIRMWARE_STEP,
            title: TITLE.FIRMWARE_STEP,
            disallowedDeviceStates: [
                DISALLOWED_STATE.DEVICE_IS_NOT_USED_HERE,
                DISALLOWED_STATE.IS_NOT_SAME_DEVICE,
            ],
        },
        {
            id: ID.START_STEP,
            title: TITLE.START_STEP,
            disallowedDeviceStates: [
                DISALLOWED_STATE.DEVICE_IS_NOT_CONNECTED,
                DISALLOWED_STATE.DEVICE_IS_IN_BOOTLOADER,
                DISALLOWED_STATE.IS_NOT_SAME_DEVICE,
                DISALLOWED_STATE.DEVICE_IS_NOT_USED_HERE,
            ],
        },
        {
            id: ID.SECURITY_STEP,
            disallowedDeviceStates: [
                DISALLOWED_STATE.DEVICE_IS_NOT_CONNECTED,
                DISALLOWED_STATE.DEVICE_IS_IN_BOOTLOADER,
                DISALLOWED_STATE.DEVICE_IS_NOT_USED_HERE,
                DISALLOWED_STATE.IS_NOT_SAME_DEVICE,
            ],
        },
        {
            id: ID.BACKUP_STEP,
            title: TITLE.BACKUP_STEP,
            disallowedDeviceStates: [
                DISALLOWED_STATE.DEVICE_IS_NOT_CONNECTED,
                DISALLOWED_STATE.DEVICE_IS_IN_BOOTLOADER,
                DISALLOWED_STATE.DEVICE_IS_NOT_USED_HERE,
                DISALLOWED_STATE.IS_NOT_SAME_DEVICE,
            ],
        },
        {
            id: ID.SET_PIN_STEP,
            title: TITLE.SET_PIN_STEP,
            disallowedDeviceStates: [
                DISALLOWED_STATE.DEVICE_IS_NOT_CONNECTED,
                DISALLOWED_STATE.DEVICE_IS_IN_BOOTLOADER,
                DISALLOWED_STATE.DEVICE_IS_NOT_USED_HERE,
                DISALLOWED_STATE.IS_NOT_SAME_DEVICE,
            ],
        },
        {
            id: ID.NAME_STEP,
            title: TITLE.NAME_STEP,
            disallowedDeviceStates: [
                DISALLOWED_STATE.DEVICE_IS_NOT_CONNECTED,
                DISALLOWED_STATE.DEVICE_IS_IN_BOOTLOADER,
                DISALLOWED_STATE.DEVICE_IS_NOT_USED_HERE,
                DISALLOWED_STATE.IS_NOT_SAME_DEVICE,
                DISALLOWED_STATE.DEVICE_IS_REQUESTING_PIN,
            ],
        },
        {
            id: ID.BOOKMARK_STEP,
            title: TITLE.BOOKMARK_STEP,
            disallowedDeviceStates: [
                DISALLOWED_STATE.DEVICE_IS_NOT_CONNECTED,
                DISALLOWED_STATE.DEVICE_IS_IN_BOOTLOADER,
                DISALLOWED_STATE.DEVICE_IS_NOT_USED_HERE,
                DISALLOWED_STATE.IS_NOT_SAME_DEVICE,
                DISALLOWED_STATE.DEVICE_IS_REQUESTING_PIN,
            ],
        },
        {
            id: ID.NEWSLETTER_STEP,
            title: TITLE.NEWSLETTER_STEP,
            disallowedDeviceStates: [
                DISALLOWED_STATE.DEVICE_IS_NOT_CONNECTED,
                DISALLOWED_STATE.DEVICE_IS_IN_BOOTLOADER,
                DISALLOWED_STATE.DEVICE_IS_NOT_USED_HERE,
                DISALLOWED_STATE.IS_NOT_SAME_DEVICE,
                DISALLOWED_STATE.DEVICE_IS_REQUESTING_PIN,
            ],
        },
        {
            id: ID.FINAL_STEP,
        },
    ],
};

const onboarding = (state = initialState, action: OnboardingActionTypes) => {
    switch (action.type) {
        case SET_STEP_ACTIVE:
            return {
                ...state,
                activeStepId: action.stepId,
                activeSubStep: null,
                steps: state.steps.map(((step: Step) => {
                    if (step.id === action.stepId) {
                        return {
                            ...step,
                        };
                    }
                    return step;
                })),
            };
        case SET_STEP_RESOLVED:
            return {
                ...state,
                steps: state.steps.map(((step: Step) => {
                    if (step.id === action.stepId) {
                        return {
                            ...step,
                            ...{ resolved: true },
                        };
                    }
                    return step;
                })),
            };
        case GO_TO_SUBSTEP:
            return {
                ...state,
                activeSubStep: action.subStepId,
            };
        case SELECT_TREZOR_MODEL:
            return {
                ...state,
                selectedModel: action.model,
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