// todo typescript, wait for trezor-connect declarations;

import TrezorConnect, {
    DEVICE_EVENT, DEVICE, TRANSPORT_EVENT, UI_EVENT, UI, TRANSPORT,
} from 'trezor-connect';
import connectConfig from 'config/connect';
import {
    DEVICE_CALL_START,
    DEVICE_CALL_ERROR,
    DEVICE_CALL_SUCCESS,
    DEVICE_CALL_RESET,
    TRANSPORT_ERROR,
    TRANSPORT_START,
    DEVICE_INTERACTION_EVENT,
    UI_INTERACTION_EVENT,
    SET_CONNECT_ERROR,
} from 'types/connect';
import { State, GetState, Dispatch } from 'types/redux';
import { AnyStepId } from 'types/steps';
import { SET_APPLICATION_ERROR } from 'types/onboarding';
import * as CALLS from 'actions/constants/calls';
import { DEFAULT_LABEL } from 'constants/trezor';

import { goToNextStep } from './onboardingActions';


declare global {
    interface Window {
        __TREZOR_CONNECT_SRC: string;
    }
}

const getFeatures = () => (dispatch: Dispatch) => dispatch(call(CALLS.GET_FEATURES));
const firmwareErase = (params: any) => (dispatch: Dispatch) => dispatch(call(CALLS.FIRMWARE_ERASE, params));
const firmwareUpload = (params: any) => (dispatch: Dispatch) => dispatch(call(CALLS.FIRMWARE_UPLOAD, params));
const resetDevice = () => (dispatch: Dispatch, getState: GetState) => {
    const { device } = getState().connect;
    if (device.features.major_version === 1) {
        return dispatch(call(
            CALLS.RESET_DEVICE, {
                label: DEFAULT_LABEL,
                skipBackup: true,
                passhpraseProtection: true,
            },
        ));
    }
    return dispatch(call(
        CALLS.RESET_DEVICE, {
            strength: 128,
            label: DEFAULT_LABEL,
            skipBackup: true,
            passhpraseProtection: true,
        },
    ));
};

const backupDevice = () => (dispatch: Dispatch) => dispatch(call(CALLS.BACKUP_DEVICE));
const applySettings = (params: any) => (dispatch: Dispatch) => dispatch(call(CALLS.APPLY_SETTINGS, params));
const applyFlags = (params: any) => (dispatch: Dispatch) => dispatch(call(CALLS.APPLY_FLAGS, params));
const changePin = () => (dispatch: Dispatch) => dispatch(call(CALLS.CHANGE_PIN));
const recoveryDevice = () => (dispatch: Dispatch, getState: GetState) => {
    let defaults;
    const { device } = getState().connect;
    const { recovery } = getState();
    if (device.features.major_version === 2) {
        defaults = {
            passphrase_protection: true,
        };
    } else {
        defaults = {
            passphrase_protection: true,
            type: recovery.advancedRecovery ? 1 : 0,
            word_count: recovery.wordsCount,
        };
    }

    return dispatch(call(CALLS.RECOVER_DEVICE, { ...defaults }));
};
const wipeDevice = () => (dispatch: Dispatch) => dispatch(call(CALLS.WIPE_DEVICE));
const submitNewPin = (params: any) => (dispatch: Dispatch) => dispatch(uiResponseCall(UI.RECEIVE_PIN, params));
const submitWord = (params: any) => (dispatch: Dispatch) => dispatch(uiResponseCall(UI.RECEIVE_WORD, params));

// todo: maybe rework this function to take concrete call function as argument;
// todo: not used now.
const callActionAndGoToNextStep = (name: string, params: any, stepId?: AnyStepId, goOnSuccess: boolean = true, goOnError: boolean = false) => (dispatch: Dispatch) => {
    dispatch(call(name, params)).then((response: any) => {
        if (response.success && goOnSuccess) {
            dispatch(goToNextStep(stepId));
        } if (!response.success && goOnError) {
            dispatch(goToNextStep(stepId));
        }
    });
};

const call = (name: string, params?: any) => async (dispatch: Dispatch, getState: GetState) => {
    const { device } = getState().connect;

    try {
        const currentCall = getState().connect.deviceCall;
        if (currentCall.isProgress) {
            console.warn('[ConnectActions]: device call in progress. Aborting call');
            return null;
        }

        dispatch({ type: DEVICE_CALL_RESET });

        dispatch({
            type: DEVICE_CALL_START,
            name,
        });

        if (device === null) {
            dispatch({
                type: DEVICE_CALL_ERROR,
                error: 'no device connected',
                name,
            });
            return null;
        }

        const callParams = {
            useEmptyPassphrase: true,
            device,
        };
        Object.assign(callParams, params);
        console.warn('callParams', callParams);
        let fn;
        switch (name) {
            case CALLS.FIRMWARE_ERASE:
                fn = () => TrezorConnect.firmwareErase(callParams);
                break;
            case CALLS.FIRMWARE_UPLOAD:
                fn = () => TrezorConnect.firmwareUpload(callParams);
                break;
            case CALLS.RESET_DEVICE:
                fn = () => TrezorConnect.resetDevice(callParams);
                break;
            case CALLS.BACKUP_DEVICE:
                fn = () => TrezorConnect.backupDevice(callParams);
                break;
            case CALLS.APPLY_SETTINGS:
                fn = () => TrezorConnect.applySettings(callParams);
                break;
            case CALLS.APPLY_FLAGS:
                fn = () => TrezorConnect.applyFlags(callParams);
                break;
            case CALLS.GET_FEATURES:
                fn = () => TrezorConnect.getFeatures(callParams);
                break;
            case CALLS.CHANGE_PIN:
                fn = () => TrezorConnect.changePin(callParams);
                break;
            case CALLS.RECOVER_DEVICE:
                fn = () => TrezorConnect.recoveryDevice(callParams);
                break;
            case CALLS.WIPE_DEVICE:
                fn = () => TrezorConnect.wipeDevice(callParams);
                break;
            default: throw new Error(`call ${name} does not exist`);
        }
        const response = await fn();
        if (response.success) {
            dispatch({
                type: DEVICE_CALL_SUCCESS,
                result: response.payload,
                name,
            });
            return response;
        }
        dispatch({
            type: DEVICE_CALL_ERROR,
            error: response.payload.error,
            name,
        });
        return response;
    } catch (error) {
        // todo: this is probably not used anymore.
        dispatch({
            type: SET_APPLICATION_ERROR,
            error,
        });
        return error;
    }
};

const uiResponseCall = (name: string, params: any) => async (dispatch: Dispatch) => {
    try {
        let fn;
        switch (name) {
            case UI.RECEIVE_PIN:
                fn = () => TrezorConnect.uiResponse({ type: UI.RECEIVE_PIN, payload: params.pin });
                break;
            case UI.RECEIVE_WORD:
                fn = () => TrezorConnect.uiResponse({ type: UI.RECEIVE_WORD, payload: params.word });
                break;
            default: throw new Error(`call ${name} does not exist`);
        }
        await fn();
    } catch (error) {
        dispatch({
            type: SET_APPLICATION_ERROR,
            error,
        });
    }
};

// todo: maybe connect this with getFeatures call and use it as "initialize" in terms of connect?
const resetCall = () => ({ type: DEVICE_CALL_RESET });

const init = () => async (dispatch: Dispatch) => {
    TrezorConnect.on(DEVICE_EVENT, (event: any) => {
        if ([DEVICE.CONNECT, DEVICE.CONNECT_UNACQUIRED, DEVICE.CHANGED, DEVICE.DISCONNECT].includes(event.type)) {
            dispatch({
                type: event.type,
                device: event.payload,
            });
        }
    });

    TrezorConnect.on(UI_EVENT, (event: any) => {
        if (event.type === UI.REQUEST_BUTTON) {
            dispatch({
                type: DEVICE_INTERACTION_EVENT,
                name: event.payload.code,
            });
        } else if (event.type === UI.REQUEST_PIN) {
            dispatch({
                type: UI_INTERACTION_EVENT,
                name: UI.REQUEST_PIN,
            });
        } else if (event.type === UI.REQUEST_WORD) {
            dispatch({
                type: UI_INTERACTION_EVENT,
                name: event.payload.type,
            });
        }
    });

    TrezorConnect.on(TRANSPORT_EVENT, (event: any) => {
        const { type } = event;
        // this transport-error case is not error from application view.
        // It just means that we dont have bridge started
        if (type === TRANSPORT.ERROR) {
            // but we still need to dispatch bridge installers provided by Connect;
            dispatch({
                type: TRANSPORT_ERROR,
                transport: event.payload,
            });
        } else if (type === TRANSPORT.START) {
            dispatch({
                type: TRANSPORT_START,
                transport: event.payload,
            });
        }
    });

    if (connectConfig.endpoint) {
        window.__TREZOR_CONNECT_SRC = connectConfig.endpoint; // eslint-disable-line no-underscore-dangle
    }

    try {
        await TrezorConnect.init(connectConfig.init);
    } catch (error) {
        // typically iframe timeout
        dispatch({
            type: SET_CONNECT_ERROR,
            error,
        });
    }
};

export {
    init,
    // calls to connect
    resetCall,
    getFeatures,
    firmwareErase,
    firmwareUpload,
    resetDevice,
    backupDevice,
    applySettings,
    applyFlags,
    changePin,
    recoveryDevice,
    wipeDevice,
    // customizable call
    callActionAndGoToNextStep,
    // responses to device events
    submitNewPin,
    submitWord,
};
