/*
    This is a config file describing order of steps and their configuration.
*/

import { ID, TITLE } from 'views/onboarding/constants/steps';
import {
    IS_NOT_SAME_DEVICE,
    DEVICE_IS_NOT_CONNECTED,
    DEVICE_IS_NOT_USED_HERE,
    DEVICE_IS_IN_BOOTLOADER,
    DEVICE_IS_REQUESTING_PIN,
} from 'utils/rules';

// Todo: id, title, cluster

export default [
    {
        id: ID.WELCOME_STEP,
    },
    {
        id: ID.SELECT_DEVICE_STEP,
        title: TITLE.SELECT_DEVICE_STEP,
    },
    {
        id: ID.UNBOXING_STEP,
        title: TITLE.UNBOXING_STEP,
    },
    {
        id: ID.BRIDGE_STEP,
        title: TITLE.BRIDGE_STEP,
    },
    {
        id: ID.CONNECT_STEP,
        title: TITLE.BRIDGE_STEP,
        disdisallowedDeviceStates: [
            DEVICE_IS_NOT_USED_HERE,
        ],
    },
    {
        id: ID.FIRMWARE_STEP,
        title: TITLE.FIRMWARE_STEP,
        disallowedDeviceStates: [
            DEVICE_IS_NOT_USED_HERE,
            IS_NOT_SAME_DEVICE,
        ],
    },
    {
        id: ID.START_STEP,
        title: TITLE.START_STEP,
        disallowedDeviceStates: [
            DEVICE_IS_NOT_CONNECTED,
            DEVICE_IS_IN_BOOTLOADER,
            IS_NOT_SAME_DEVICE,
            DEVICE_IS_NOT_USED_HERE,
        ],
    },
    {
        id: ID.RECOVERY_STEP,
        title: TITLE.START_STEP,
        disallowedDeviceStates: [
            DEVICE_IS_NOT_CONNECTED,
            DEVICE_IS_IN_BOOTLOADER,
            IS_NOT_SAME_DEVICE,
            DEVICE_IS_NOT_USED_HERE,
        ],
    },
    {
        id: ID.SECURITY_STEP,
        disallowedDeviceStates: [
            DEVICE_IS_NOT_CONNECTED,
            DEVICE_IS_IN_BOOTLOADER,
            DEVICE_IS_NOT_USED_HERE,
            IS_NOT_SAME_DEVICE,
        ],
    },
    {
        id: ID.BACKUP_STEP,
        title: TITLE.SECURITY_STEP,
        disallowedDeviceStates: [
            DEVICE_IS_NOT_CONNECTED,
            DEVICE_IS_IN_BOOTLOADER,
            DEVICE_IS_NOT_USED_HERE,
            IS_NOT_SAME_DEVICE,
        ],
    },
    {
        id: ID.SET_PIN_STEP,
        title: TITLE.SECURITY_STEP,
        disallowedDeviceStates: [
            DEVICE_IS_NOT_CONNECTED,
            DEVICE_IS_IN_BOOTLOADER,
            DEVICE_IS_NOT_USED_HERE,
            IS_NOT_SAME_DEVICE,
        ],
    },
    {
        id: ID.NAME_STEP,
        title: TITLE.SECURITY_STEP,
        disallowedDeviceStates: [
            DEVICE_IS_NOT_CONNECTED,
            DEVICE_IS_IN_BOOTLOADER,
            DEVICE_IS_NOT_USED_HERE,
            IS_NOT_SAME_DEVICE,
            DEVICE_IS_REQUESTING_PIN,
        ],
    },
    {
        id: ID.BOOKMARK_STEP,
        title: TITLE.SECURITY_STEP,
        disallowedDeviceStates: [
            DEVICE_IS_NOT_CONNECTED,
            DEVICE_IS_IN_BOOTLOADER,
            DEVICE_IS_NOT_USED_HERE,
            IS_NOT_SAME_DEVICE,
            DEVICE_IS_REQUESTING_PIN,
        ],
    },
    {
        id: ID.NEWSLETTER_STEP,
        title: TITLE.SECURITY_STEP,
        disallowedDeviceStates: [
            DEVICE_IS_NOT_CONNECTED,
            DEVICE_IS_IN_BOOTLOADER,
            DEVICE_IS_NOT_USED_HERE,
            IS_NOT_SAME_DEVICE,
            DEVICE_IS_REQUESTING_PIN,
        ],
    },
    {
        id: ID.FINAL_STEP,
    },
];