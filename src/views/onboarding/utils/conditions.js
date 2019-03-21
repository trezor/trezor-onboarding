export const IS_SAME_DEVICE = 'is-same-device';
export const DEVICE_IS_NOT_INITIALIZED = 'device-is-not-initialized';
export const DEVICE_HAS_BACKUP = 'device-has-backup';
export const DEVICE_IS_CONNECTED = 'device-is-connected';

export const deviceIsConnected = device => device !== null && device.connected === true;

// is same device is not entry but reconnect condition that applies for all steps
// with deviceIsConnected
export const isSameDevice = (device) => {
    if (!device) {
        return null; // null means we cant tell
    }
    return device.isSameDevice;
};
export const deviceIsNotInitialized = device => device && device.features.initialized === false;

export const deviceHasBackup = device => device && device.features.needs_backup === false && device.features.unfinished_backup !== true;

export const evaluate = (device, conditions) => {
    const result = [];
    if (!conditions) {
        return result;
    }
    conditions.forEach((condition) => {
        let checkFn;
        switch (condition) {
            case IS_SAME_DEVICE:
                checkFn = isSameDevice;
                break;
            case DEVICE_IS_NOT_INITIALIZED:
                checkFn = deviceIsNotInitialized;
                break;
            case DEVICE_HAS_BACKUP:
                checkFn = deviceHasBackup;
                break;
            case DEVICE_IS_CONNECTED:
                checkFn = deviceIsConnected;
                break;
            default:
                throw new Error(`Wrong condition passed: ${condition}`);
        }
        if (checkFn(device) === false) {
            result.push(condition);
        }
    });
    return result;
};

export const filterUnmet = conditions => conditions.filter(condition => condition.result === false);