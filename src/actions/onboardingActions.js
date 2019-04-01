import * as ONBOARDING from 'actions/constants/onboarding';
import { ID } from 'views/onboarding/constants/steps';
import { getLocalization } from './fetchActions';

const goToNextStep = stepId => (dispatch, getState) => {
    const { device } = getState().connect;
    const { activeStep, steps } = getState().onboarding;
    const nextStep = stepId || findNextStepId(activeStep, steps);
    if (nextStep === ID.SECURITY_STEP) {
        dispatch({
            type: ONBOARDING.SET_STEPS,
            steps: sortSteps(steps, device.features),
        });
    }
    dispatch({
        type: ONBOARDING.GO_TO_NEXT_STEP,
        stepId: nextStep,
    });
};

const goToSubStep = subStepId => ({
    type: ONBOARDING.GO_TO_SUBSTEP,
    subStepId,
});

const goToPreviousStep = stepId => (dispatch, getState) => {
    const { activeStep } = getState().onboarding;
    const prevStep = stepId || findPrevStepId(activeStep, getState().onboarding.steps);
    dispatch({
        type: ONBOARDING.GO_TO_PREVIOUS_STEP,
        stepId: prevStep,
    });
};

const selectTrezorModel = model => ({
    type: ONBOARDING.SELECT_TREZOR_MODEL,
    model,
});

const findNextStepId = (currentStep, onboardingSteps) => {
    const currentIndex = onboardingSteps.findIndex(step => step.id === currentStep);
    if (currentIndex + 1 > onboardingSteps.length) {
        throw new Error('no next step exists');
    }
    return onboardingSteps[currentIndex + 1].id;
};

const findPrevStepId = (currentStep, onboardingSteps) => {
    const currentIndex = onboardingSteps.findIndex(step => step.id === currentStep);
    if (currentIndex - 1 > onboardingSteps.length) {
        throw new Error('no next step exists');
    }
    return onboardingSteps[currentIndex - 1].id;
};

// after basic initialization is done, we want to already passed steps into one 'initialize device' step and
// expand security steps that were hidden under one dot until this moment;
const sortSteps = (steps, features) => {
    let sortedSteps = steps;
    // this is for recovery, we dont need backup anymore.
    if (features.needs_backup === false) {
        sortedSteps = steps.filter(step => step.id !== ID.BACKUP_STEP);
    }

    sortedSteps = sortedSteps.map((step) => {
        if (step.title !== ID.SECURITY_STEP) {
            return {
                ...step,
                title: ID.INIT_DEVICE,
            };
        }
        return {
            ...step,
            title: step.title ? step.id : null,
        };
    });
    return sortedSteps;
};

const setApplicationError = error => ({
    type: ONBOARDING.SET_APPLICATION_ERROR,
    error,
});

const setLocale = locale => (dispatch) => {
    dispatch(getLocalization(`/${locale}.json`)).then(async (result) => {
        const json = await result.json();
        dispatch({
            type: ONBOARDING.SET_LOCALIZATION,
            language: locale,
            messages: json,
        });
    });
};

export {
    goToNextStep,
    goToSubStep,
    goToPreviousStep,
    selectTrezorModel,
    setApplicationError,
    setLocale,
};
