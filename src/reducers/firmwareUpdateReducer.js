import {
    SET_PROGRESS,
} from 'actions/constants/firmwareUpdate';

const initialState = {
    progress: null,
};

const firmwareUpdate = (state = initialState, action) => {
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