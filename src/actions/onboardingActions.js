import * as ONBOARDING from 'actions/constants/onboarding';
import { ID, TITLE } from 'constants/steps';
import history from 'support/history';
import { getLocalization } from './fetchActions';

const goToStep = stepId => (dispatch, getState) => {
    history.push(`#/${stepId}`, { stepId });
    dispatch(setStep(stepId));
};

const setStep = stepId => (dispatch, getState) => {
    const { activeStepId, steps } = getState().onboarding;
    const activeStep = steps.find(step => step.id === activeStepId);
    const nextStep = steps.find(step => step.id === stepId);


    if (nextStep.cluster && nextStep.cluster !== activeStep.cluster) {
        dispatch(setActiveClusterId(nextStep.cluster));
    }

    dispatch({
        type: ONBOARDING.SET_STEP_ACTIVE,
        stepId: nextStep.id,
    });
};

const goToSubStep = subStepId => ({
    type: ONBOARDING.GO_TO_SUBSTEP,
    subStepId,
});


const goToNextStep = stepId => (dispatch, getState) => {
    const { activeStepId, steps } = getState().onboarding;
    const nextStep = findNextStep(activeStepId, steps);
    const activeStep = steps.find(step => step.id === activeStepId);

    console.warn('nextStep', nextStep);
    console.warn('activeStep', activeStep);

    // only nextStep
    if (!activeStep.resolved) {
        dispatch({
            type: ONBOARDING.SET_STEP_RESOLVED,
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
    type: ONBOARDING.SELECT_TREZOR_MODEL,
    model,
});

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

// after basic initialization is done, we want to already passed steps into one 'initialize device' step and
// expand security steps that were hidden under one dot until this moment;
const setActiveClusterId = id => (dispatch, getState) => {
    const { needs_backup } = getState().connect.device.features;
    const { steps } = getState().onboarding;
    console.warn(steps);
    console.warn('steps.findIndex((step => step.id === ID.BACKUP_STEP))', steps.findIndex((step => step.id === ID.BACKUP_STEP)));
    if (id === TITLE.SECURITY_STEP) {
        if (needs_backup === false) {
            steps.splice(
                steps.findIndex((step => step.id === ID.BACKUP_STEP)),
                1,
            );

            dispatch({
                type: ONBOARDING.SET_STEPS,
                steps,
            });
        }
    } else if (id === TITLE.INIT_DEVICE) {

    } else {
        throw new Error('unsupported cluster');
    }
    dispatch({
        type: ONBOARDING.SET_ACTIVE_CLUSTER_ID,
        id,
    });
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

const toggleDownloadClicked = () => ({
    type: ONBOARDING.TOGGLE_DOWNLOAD_CLICKED,
});

export {
    goToNextStep,
    goToSubStep,
    goToStep,
    setStep,
    setActiveClusterId,
    goToPreviousStep,
    selectTrezorModel,
    setApplicationError,
    setLocale,
    toggleDownloadClicked,
};
