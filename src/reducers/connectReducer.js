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
    SET_CONNECT_ERROR,
} from 'actions/constants/connect';

const initialState = {
    device: null,
    prevDeviceId: null,
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
    connectError: null,
};


const setPrevDeviceId = (state, device) => {
    // unacquired device
    if (!device.features) {
        return null;
    }
    if (!device.features.device_id) {
        return state.prevDeviceId;
    }
    if (state.prevDeviceId === null) {
        return device.features.device_id;
    }
    if (state.prevDeviceId !== device.features.device_id) {
        return state.prevDeviceId;
    }
    return device.features.device_id;
};

const connect = (state = initialState, action) => {
    switch (action.type) {
        case TRANSPORT_START:
            return {
                ...state,
                transport: action.transport,
                connectError: null,
            };
        case TRANSPORT_ERROR:
            return {
                ...state,
                transport: action.transport,
            };
        case DEVICE.CONNECT_UNACQUIRED:
        case DEVICE.CONNECT:
            return {
                ...state,
                device: {
                    connected: true,
                    features: {},
                    ...action.device,
                },
            };
        case DEVICE.CHANGED:
            return {
                ...state,
                device: {
                    connected: true,
                    features: {},
                    ...action.device,
                },
            };

        case DEVICE.DISCONNECT:
            return {
                ...state,
                device: {
                    connected: false,
                    ...action.device,
                },
                uiInteraction: {
                    name: null,
                    counter: 0,
                },
                prevDeviceId: setPrevDeviceId(state, action.device),
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
                prevDeviceId: null,
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
        case SET_CONNECT_ERROR:
            return {
                ...state,
                connectError: action.error,
            };
        default:
            return state;
    }
};

export default connect;