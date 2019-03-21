import { DEVICE } from 'trezor-connect';

import {
    DEVICE_CALL_START,
    DEVICE_CALL_ERROR,
    DEVICE_CALL_SUCCESS,
    DEVICE_CALL_RESET,
    TRANSPORT_ERROR,
    TRANSPORT_START,
    DEVICE_INTERACTION_EVENT,
    UI_INTERACTION_EVENT,
    SET_DEVICE_FEATURES,
} from 'actions/constants/connect';

const initialState = {
    device: null,
    transport: null,
    deviceCall: {
        name: null,
        isProgress: false,
        error: null,
        result: null,
    },
    deviceInteraction: {
        name: null,
        counter: 0,
    },
    uiInteraction: {
        name: null,
        counter: 0,
    },
};

const connect = (state = initialState, action) => {
    switch (action.type) {
        case TRANSPORT_START:
            return {
                ...state,
                transport: action.transport,
            };
        case TRANSPORT_ERROR:
            return {
                ...state,
                transport: action.transport,
            };
        case DEVICE.CONNECT:
            return {
                ...state,
                device: { connected: true, ...action.device },
            };
        case DEVICE.CHANGED:
            return {
                ...state,
                device: { connected: true, ...action.device },
            };

        case DEVICE.DISCONNECT:
            return {
                ...state,
                device: { connected: false, ...action.device },
            };
        case DEVICE_CALL_RESET: {
            return {
                ...state,
                deviceCall: {
                    name: null, isProgress: false, error: null, result: null,
                },
                deviceInteraction: {
                    name: null,
                    counter: 0,
                },
                uiInteraction: {
                    name: null,
                    counter: 0,
                },
            };
        }
        case DEVICE_CALL_START:
            return {
                ...state,
                deviceCall: {
                    ...state.deviceCall, name: action.name, isProgress: true,
                },
            };
        case DEVICE_CALL_SUCCESS:
            return {
                ...state,
                deviceCall: {
                    ...state.deviceCall,
                    isProgress: false,
                    error: null,
                    result: action.result,
                },
                deviceInteraction: {
                    name: null,
                    counter: 0,
                },
                uiInteraction: {
                    name: null,
                    counter: 0,
                },
            };
        case DEVICE_CALL_ERROR:
            return {
                ...state,
                deviceCall: {
                    ...state.deviceCall,
                    name: action.name,
                    isProgress: false,
                    error: action.error,
                    result: null,
                },
            };
        case DEVICE_INTERACTION_EVENT:
            return {
                ...state,
                uiInteraction: { name: null, counter: 0 },
                deviceInteraction: { name: action.name, counter: state.deviceInteraction.counter + 1 },
            };
        case UI_INTERACTION_EVENT:
            return {
                ...state,
                uiInteraction: { name: action.name, counter: state.uiInteraction.counter + 1 },
                deviceInteraction: { name: null, counter: 0 },
            };
        case SET_DEVICE_FEATURES:
            return {
                ...state,
                device: {
                    ...state.device,
                    features: action.features,
                },
            };
        default:
            return state;
    }
};

export default connect;