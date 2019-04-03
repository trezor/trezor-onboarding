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

const submit = word => (dispatch, getState) => {
    const normalizedWord = word || getState().recovery.word;
    if (normalizedWord) {
        dispatch(submitWord({ word: `${normalizedWord}` })).then(() => {
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
