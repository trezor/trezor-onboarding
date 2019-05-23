import { 
    RecoveryReducer,
    RecoveryActionTypes,
    SET_WORD,
    SET_WORDS_COUNT,
    SET_ADVANCED_RECOVERY,
} from 'types/recovery';

const initialState = {
    word: null,
    advancedRecovery: false,
    wordsCount: null,
};

const recovery = (state: RecoveryReducer = initialState, action: RecoveryActionTypes): RecoveryReducer => {
    switch (action.type) {
        case SET_WORD:
            return {
                ...state,
                word: action.word,
            };
        case SET_WORDS_COUNT:
            return {
                ...state,
                wordsCount: action.count,
            };
        case SET_ADVANCED_RECOVERY:
            return {
                ...state,
                advancedRecovery: action.value,
            };
        default:
            return state;
    }
};

export default recovery;