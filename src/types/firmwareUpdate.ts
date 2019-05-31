import {
    setProgress,
    updateFirmware,
} from 'actions/firmwareUpdateActions';

export interface FirmwareUpdateReducer {
    progress: number;
}

export interface FirmwareUpdateActions {
    setProgress: typeof setProgress,
    updateFirmware: typeof updateFirmware,
}

export const SET_PROGRESS = 'firmware_update__set__progress';

interface SetProgressAction {
    type: typeof SET_PROGRESS,
    progress: number,
}

export type FirmwareUpdateActionTypes = SetProgressAction;