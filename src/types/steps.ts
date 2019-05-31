import * as STEP from 'constants/steps';

export interface Step {
    id: AnyStepId;
    title?: string; // todo: enum
    disallowedDeviceStates?: string[]; // todo: enum
    visited?: boolean;
    resolved?: boolean;
}

export type AnyStepId =
    typeof STEP.ID_INIT_DEVICE |
    typeof STEP.ID_BACKUP_STEP |
    typeof STEP.ID_BOOKMARK_STEP |
    typeof STEP.ID_BRIDGE_STEP |
    typeof STEP.ID_FINAL_STEP |
    typeof STEP.ID_FIRMWARE_STEP |
    typeof STEP.ID_HOLOGRAM_STEP |
    typeof STEP.ID_NEWSLETTER_STEP |
    typeof STEP.ID_SELECT_DEVICE_STEP |
    typeof STEP.ID_SET_PIN_STEP |
    typeof STEP.ID_START_STEP |
    typeof STEP.ID_SECURITY_STEP |
    typeof STEP.ID_WELCOME_STEP |
    typeof STEP.ID_NAME_STEP |
    typeof STEP.ID_CONNECT_STEP |
    typeof STEP.ID_UNBOXING_STEP |
    typeof STEP.ID_RECOVERY_STEP;

export type AnyStepDisallowedState =
    typeof STEP.DISALLOWED_DEVICE_IS_IN_BOOTLOADER |
    typeof STEP.DISALLOWED_DEVICE_IS_NOT_CONNECTED |
    typeof STEP.DISALLOWED_DEVICE_IS_NOT_USED_HERE |
    typeof STEP.DISALLOWED_DEVICE_IS_REQUESTING_PIN |
    typeof STEP.DISALLOWED_IS_NOT_SAME_DEVICE;