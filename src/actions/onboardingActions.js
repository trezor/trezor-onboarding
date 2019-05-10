import {
    SET_STEP_ACTIVE, GO_TO_SUBSTEP, SET_STEP_RESOLVED, SELECT_TREZOR_MODEL, SET_APPLICATION_ERROR, SET_LOCALIZATION,
    // @ts-ignore
} from 'types/onboarding.ts';

import { getLocalization } from './fetchActions';

const goToStep = stepId => (dispatch) => {
    dispatch(setStep(stepId));
};

const setStep = stepId => (dispatch) => {
    dispatch({
        type: SET_STEP_ACTIVE,
        stepId,
    });
};

const goToSubStep = subStepId => ({
    type: GO_TO_SUBSTEP,
    subStepId,
});

const goToNextStep = stepId => (dispatch, getState) => {
    const { activeStepId, steps } = getState().onboarding;
    const nextStep = findNextStep(activeStepId, steps);
    const activeStep = steps.find(step => step.id === activeStepId);

    if (!activeStep.resolved) {
        dispatch({
            type: SET_STEP_RESOLVED,
            stepId: activeStepId,
        });
    }

    dispatch(goToStep(stepId || nextStep.id));
};

const goToPreviousStep = () => (dispatch, getState) => {
    const { activeStepId } = getState().onboarding;
    const prevStep = findPrevStep(activeStepId, getState().onboarding.steps);

    dispatch(goToStep(prevStep.id));
};

const selectTrezorModel = model => ({
    type: SELECT_TREZOR_MODEL,
    model,
});

// todo: is this used?
const setApplicationError = error => ({
    type: SET_APPLICATION_ERROR,
    error,
});

const setLocale = locale => (dispatch) => {
    dispatch(getLocalization(`/${locale}.json`)).then(async (result) => {
        const json = await result.json();
        dispatch({
            type: SET_LOCALIZATION,
            language: locale,
            messages: json,
        });
    });
};

const startAgain = () => () => {
    window.location.reload();
};

// utils
const findNextStep = (currentStep, onboardingSteps) => {
    const currentIndex = onboardingSteps.findIndex(step => step.id === currentStep);
    if (currentIndex + 1 > onboardingSteps.length) {
        throw new Error('no next step exists');
    }
    return onboardingSteps[currentIndex + 1];
};

const findPrevStep = (currentStep, onboardingSteps) => {
    const currentIndex = onboardingSteps.findIndex(step => step.id === currentStep);
    if (currentIndex - 1 > onboardingSteps.length) {
        throw new Error('no next step exists');
    }
    return onboardingSteps[currentIndex - 1];
};

export {
    goToNextStep,
    goToSubStep,
    goToStep,
    setStep,
    goToPreviousStep,
    selectTrezorModel,
    setApplicationError,
    setLocale,
    startAgain,
};
