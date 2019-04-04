export const IS_SAME_DEVICE = 'is-same-device';
export const DEVICE_IS_CONNECTED = 'device-is-connected';
export const DEVICE_IS_USED_HERE = 'device-is-used-here';
export const DEVICE_IS_NOT_IN_BOOTLOADER = 'device-is-not-in-bootloader';

const isDeviceConnected = ({ device }) => device !== null && device.connected === true;

const isSameDevice = ({ device, prevDeviceId }) => {
    // if no device was connected before, assume it is same device
    if (!prevDeviceId || !device.features.device_id) {
        return null;
    }
    return device.features.device_id === prevDeviceId;
};

const isDeviceUsedHere = ({ device }) => {
    if (!device || !device.connected) {
        return null;
    }
    return device.status === 'available' && device.type !== 'unacquired';
};

const isNotInBootloader = ({ device }) => {
    if (!device || !device.features) {
        return null;
    }
    return device.features.bootloader_mode !== true;
};

export const getFnForRule = (rule) => {
    switch (rule) {
        case IS_SAME_DEVICE:
            return isSameDevice;
        case DEVICE_IS_CONNECTED:
            return isDeviceConnected;
        case DEVICE_IS_USED_HERE:
            return isDeviceUsedHere;
        case DEVICE_IS_NOT_IN_BOOTLOADER:
            return isNotInBootloader;
        default:
            throw new Error(`Wrong rule passed: ${rule}`);
    }
};
