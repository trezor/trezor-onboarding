import {
    setWord, setWordsCount, setAdvancedRecovery, submit,
} from 'actions/recoveryActions';

export interface RecoveryReducer {
    word: null | string;
    advancedRecovery: boolean;
    wordsCount: number;
}

export interface RecoveryActions {
    setWord: typeof setWord,
    submit: typeof submit,
    setWordsCount: typeof setWordsCount,
    setAdvancedRecovery: typeof setAdvancedRecovery,
}

export const SET_WORD = 'recovery__set__word';
export const SET_WORDS_COUNT = 'recovery__set__words__count';
export const SET_ADVANCED_RECOVERY = 'recovery__set__advanced__recovery';

interface SetWordAction {
    type: typeof SET_WORD,
    word: string,
}

interface SetWordsCountAction {
    type: typeof SET_WORDS_COUNT,
    count: number,
}

interface SetAdvancedRecoveryAction {
    type: typeof SET_ADVANCED_RECOVERY,
    value: boolean,
}

export type RecoveryActionTypes = SetWordAction | SetWordsCountAction | SetAdvancedRecoveryAction;