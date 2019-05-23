export interface FirmwareUpdateReducer {
    progress: number | null;
}

export const SET_PROGRESS = 'firmware_update__set__progress';

interface SetProgressAction {
    type: typeof SET_PROGRESS,
    progress: number,
}

export type FirmwareUpdateActionTypes = SetProgressAction;