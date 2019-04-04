/*
    This is a config file describing order of steps and their configuration.
*/

import { ID } from 'views/onboarding/constants/steps';
import {
    IS_SAME_DEVICE, DEVICE_IS_CONNECTED, DEVICE_IS_USED_HERE,
} from 'utils/rules';

export default [
    {
        id: ID.WELCOME_STEP,
    },
    {
        id: ID.SELECT_DEVICE_STEP,
        title: ID.SELECT_DEVICE_STEP,
    },
    {
        id: ID.UNBOXING_STEP,
        title: ID.UNBOXING_STEP,
    },
    {
        id: ID.BRIDGE_STEP,
        title: ID.BRIDGE_STEP,
    },
    {
        id: ID.CONNECT_STEP,
        title: ID.BRIDGE_STEP,
        allowedDeviceStates: [DEVICE_IS_USED_HERE],
    },
    {
        id: ID.FIRMWARE_STEP,
        title: ID.FIRMWARE_STEP,
        allowedDeviceStates: [IS_SAME_DEVICE, DEVICE_IS_USED_HERE],
    },
    {
        id: ID.START_STEP,
        title: ID.START_STEP,
        allowedDeviceStates: [DEVICE_IS_CONNECTED, IS_SAME_DEVICE, DEVICE_IS_USED_HERE],
    },
    {
        id: ID.RECOVERY_STEP,
        title: ID.START_STEP,
        allowedDeviceStates: [DEVICE_IS_CONNECTED, IS_SAME_DEVICE, DEVICE_IS_USED_HERE],
    },
    {
        id: ID.SECURITY_STEP,
        allowedDeviceStates: [DEVICE_IS_CONNECTED, IS_SAME_DEVICE, DEVICE_IS_USED_HERE],
    },
    {
        id: ID.BACKUP_STEP,
        title: ID.SECURITY_STEP,
        allowedDeviceStates: [DEVICE_IS_CONNECTED, IS_SAME_DEVICE, DEVICE_IS_USED_HERE],
    },
    {
        id: ID.SET_PIN_STEP,
        title: ID.SECURITY_STEP,
        allowedDeviceStates: [DEVICE_IS_CONNECTED, IS_SAME_DEVICE, DEVICE_IS_USED_HERE],
    },
    {
        id: ID.NAME_STEP,
        title: ID.SECURITY_STEP,
        allowedDeviceStates: [DEVICE_IS_CONNECTED, IS_SAME_DEVICE, DEVICE_IS_USED_HERE],
    }, {
        id: ID.BOOKMARK_STEP,
        title: ID.SECURITY_STEP,
        allowedDeviceStates: [DEVICE_IS_CONNECTED, IS_SAME_DEVICE, DEVICE_IS_USED_HERE],
    }, {
        id: ID.NEWSLETTER_STEP,
        title: ID.SECURITY_STEP,
        allowedDeviceStates: [DEVICE_IS_CONNECTED, IS_SAME_DEVICE, DEVICE_IS_USED_HERE],
    }, {
        id: ID.FINAL_STEP,
    },
];