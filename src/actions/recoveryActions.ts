import * as RECOVERY from 'actions/constants/recovery';
import { Dispatch, ThunkDispatch, GetState } from 'types/redux';
import { submitWord } from './connectActions';

const setWord = (word: string) => ({
    type: RECOVERY.SET_WORD,
    word,
});

const setWordsCount = (count: number) => ({
    type: RECOVERY.SET_WORDS_COUNT,
    count,
});

const setAdvancedRecovery = (value: boolean) => ({
    type: RECOVERY.SET_ADVANCED_RECOVERY,
    value,
});

const submit = (word: string) => (dispatch: ThunkDispatch, getState: GetState) => {
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
