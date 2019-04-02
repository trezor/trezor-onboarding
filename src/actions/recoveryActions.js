import * as RECOVERY from 'actions/constants/recovery';
import { submitWord } from './connectActions';

const setWord = word => ({
    type: RECOVERY.SET_WORD,
    word,
});

const setWordsCount = count => ({
    type: RECOVERY.SET_WORDS_COUNT,
    count,
});

const setAdvancedRecovery = value => ({
    type: RECOVERY.SET_ADVANCED_RECOVERY,
    value,
});

const submit = () => (dispatch, getState) => {
    if (getState().recovery.word) {
        dispatch(submitWord({ word: getState().recovery.word })).then(() => {
            dispatch({
                type: RECOVERY.SET_WORD,
                word: null,
            });
        });
    }
};

export {
    setWord,
    submit,
    setWordsCount,
    setAdvancedRecovery,
};
