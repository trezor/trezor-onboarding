import {
    goToNextStep,
    goToSubStep,
    goToStep,
    goToPreviousStep,
    selectTrezorModel,
    setApplicationError,
    setLocale,
    startAgain,
} from 'actions/onboardingActions';

import { Step, AnyStepId } from 'types/steps';

export interface OnboardingReducer {
    selectedModel: number | null,
    activeStepId: AnyStepId | null,
    activeSubStep: string | null,
    language: string, // enum
    messages: any, // todo:
    steps: Step[], // todo:
}

export interface OnboardingActions {
    goToNextStep: typeof goToNextStep,
    goToSubStep: typeof goToSubStep,
    goToStep: typeof goToStep,
    goToPreviousStep: typeof goToPreviousStep,
    selectTrezorModel: typeof selectTrezorModel,
    setApplicationError: typeof setApplicationError,
    setLocale: typeof setLocale,
    startAgain: typeof startAgain
}

export const GO_TO_SUBSTEP = 'onboarding__go__to__substep';
export const SET_STEP_ACTIVE = 'onboarding__set__step__active';
export const SET_STEP_RESOLVED = 'onboarding__set__step__resolved';
export const SELECT_TREZOR_MODEL = 'onboarding__select__trezor__model';
export const SET_APPLICATION_ERROR = 'onboarding__set__application__error';
export const SET_STEPS = 'onboarding__set__steps';
export const SET_LOCALIZATION = 'onboarding__set__localization';

// todo: for reference
interface SetStepActiveAction {
    type: typeof SET_STEP_ACTIVE,
    stepId: AnyStepId,
}

interface SetStepResolvedAction {
    type: typeof SET_STEP_RESOLVED,
    stepId: AnyStepId,
}

interface GoToSubstepAction {
    type: typeof GO_TO_SUBSTEP,
    subStepId: string | null,
}

interface SelectTrezorModelAction {
    type: typeof SELECT_TREZOR_MODEL,
    model: number,
}

interface SetApplicationErrorAction {
    type: typeof SET_APPLICATION_ERROR,
    error: string,
}

interface SetLocalizationAction {
    type: typeof SET_LOCALIZATION,
    language: string, // todo:
    messages: any // todo:
}

export type OnboardingActionTypes = SetStepActiveAction | SetStepResolvedAction | GoToSubstepAction | SelectTrezorModelAction | SetApplicationErrorAction | SetLocalizationAction
