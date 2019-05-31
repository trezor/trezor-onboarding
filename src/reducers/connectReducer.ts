import * as Connect from 'types/connect';
import { Action } from 'types/redux';

const initialState: Connect.ConnectReducer = {
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

const setPrevDeviceId = (state: Connect.ConnectReducer, device: Connect.Device) => {
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

const connect = (state: Connect.ConnectReducer = initialState, action: Connect.ActionTypes): Connect.ConnectReducer => {
    switch (action.type) {
        case Connect.TRANSPORT_START:
            return {
                ...state,
                transport: action.transport,
                connectError: null,
            };
        case Connect.TRANSPORT_ERROR:
            return {
                ...state,
                transport: action.transport,
            };
        case Connect.CONNECT_UNACQUIRED:
        case Connect.DEVICE_CONNECT:
            return {
                ...state,
                device: {
                    connected: true,
                    features: {},
                    ...action.device,
                },
            };
        case Connect.CHANGED:
            return {
                ...state,
                device: {
                    connected: true,
                    features: {},
                    ...action.device,
                },
            };

        case Connect.DISCONNECT:
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
        case Connect.DEVICE_CALL_RESET: {
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
        case Connect.DEVICE_CALL_START:
            return {
                ...state,
                deviceCall: {
                    ...state.deviceCall, name: action.name, isProgress: true,
                },
            };
        case Connect.DEVICE_CALL_SUCCESS:
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
        case Connect.DEVICE_CALL_ERROR:
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
        case Connect.DEVICE_INTERACTION_EVENT:
            return {
                ...state,
                uiInteraction: { name: null, counter: 0 },
                deviceInteraction: { name: action.name, counter: state.deviceInteraction.counter + 1 },
            };
        case Connect.UI_INTERACTION_EVENT:
            return {
                ...state,
                uiInteraction: { name: action.name, counter: state.uiInteraction.counter + 1 },
                deviceInteraction: { name: null, counter: 0 },
            };
        case Connect.SET_DEVICE_FEATURES:
            return {
                ...state,
                device: {
                    ...state.device,
                    features: action.features,
                },
            };
        case Connect.SET_CONNECT_ERROR:
            return {
                ...state,
                connectError: action.error,
            };
        default:
            return state;
    }
};

export default connect;