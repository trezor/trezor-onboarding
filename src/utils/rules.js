export const IS_SAME_DEVICE = 'is-same-device';
export const DEVICE_IS_CONNECTED = 'device-is-connected';

const deviceIsConnected = ({ device }) => device !== null && device.connected === true;

const isSameDevice = ({ device, prevDeviceId }) => {
    // if no device was connected before, assume it is same device
    if (!prevDeviceId) {
        return null;
    }
    return device.features.device_id === prevDeviceId;
};

export const getFnForRule = (rule) => {
    switch (rule) {
        case IS_SAME_DEVICE:
            return isSameDevice;
        case DEVICE_IS_CONNECTED:
            return deviceIsConnected;
        default:
            throw new Error(`Wrong rule passed: ${rule}`);
    }
};
