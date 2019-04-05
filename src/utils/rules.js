export const IS_NOT_SAME_DEVICE = 'is-not-same-device';
export const DEVICE_IS_NOT_CONNECTED = 'device-is-not-connected';
export const DEVICE_IS_NOT_USED_HERE = 'device-is-not-used-here';
export const DEVICE_IS_IN_BOOTLOADER = 'device-is-in-bootloader';
export const DEVICE_IS_REQUESTING_PIN = 'device-is-not-requesting-pin';

export const isNotConnected = ({ device }) => device !== null && device.connected !== true;

export const isNotSameDevice = ({ device, prevDeviceId }) => {
    // if no device was connected before, assume it is same device
    if (!prevDeviceId || !device.features.device_id) {
        return null;
    }
    return device.features.device_id !== prevDeviceId;
};

export const isNotUsedHere = ({ device }) => {
    if (!device || !device.connected) {
        return null;
    }
    return device.status !== 'available' || device.type === 'unacquired';
};

export const isInBootloader = ({ device }) => {
    if (!device || !device.features) {
        return null;
    }
    return device.features.bootloader_mode === true;
};

export const isRequestingPin = ({ device, uiInteraction }) => {
    if (!device || !device.features) {
        return null;
    }
    return uiInteraction.name === 'ui-request_pin' && device.features.pin_cached === false && device.features.pin_protection === true;
};

export const getFnForRule = (rule) => {
    switch (rule) {
        case IS_NOT_SAME_DEVICE:
            return isNotSameDevice;
        case DEVICE_IS_NOT_CONNECTED:
            return isNotConnected;
        case DEVICE_IS_NOT_USED_HERE:
            return isNotUsedHere;
        case DEVICE_IS_IN_BOOTLOADER:
            return isInBootloader;
        case DEVICE_IS_REQUESTING_PIN:
            return isRequestingPin;
        default:
            throw new Error(`Wrong rule passed: ${rule}`);
    }
};
