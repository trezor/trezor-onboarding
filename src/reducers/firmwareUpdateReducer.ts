import {
    SET_PROGRESS,
    FirmwareUpdateReducer,
    FirmwareUpdateActionTypes
} from 'types/firmwareUpdate';

const initialState = {
    progress: null,
};

const firmwareUpdate = (state: FirmwareUpdateReducer = initialState , action: FirmwareUpdateActionTypes): FirmwareUpdateReducer => {
    switch (action.type) {
        case SET_PROGRESS:
            return {
                ...state,
                progress: action.progress,
            };
        default:
            return state;
    }
};

export default firmwareUpdate;