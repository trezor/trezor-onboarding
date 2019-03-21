
import {
    FETCH_START,
    FETCH_SUCCESS,
    FETCH_ERROR,
} from 'actions/constants/fetch';

const initialState = {
    name: null,
    isProgress: false,
    error: null,
    result: null,
};

const connect = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_START:
            return {
                ...state,
                name: action.name,
                isProgress: true,
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                isProgress: false,
                error: null,
                result: action.result,
            };
        case FETCH_ERROR:
            return {
                ...state,
                isProgress: false,
                error: action.error,
                result: null,
            };
        default:
            return state;
    }
};

export default connect;