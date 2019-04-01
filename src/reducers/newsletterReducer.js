import {
    TOGGLE_CHECKBOX, SET_EMAIL, SET_SKIPPED,
} from 'actions/constants/newsletter';

const initialState = {
    email: '',
    skipped: false,
    checkboxes: {
        security: true,
        promo: false,
    },
};

const recovery = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CHECKBOX:
            return {
                ...state,
                checkboxes: { ...state.checkboxes, [action.checkbox]: !state.checkboxes[action.checkbox] },
            };
        case SET_EMAIL:
            return {
                ...state,
                email: action.email,
            };
        case SET_SKIPPED:
            return {
                ...state,
                skipped: true,
            };
        default:
            return state;
    }
};

export default recovery;