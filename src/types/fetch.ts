import {
    fetchResource,
    getFirmware,
    getLocalization,
} from 'actions/fetchActions';

export interface FetchReducer {
    name: null | string;
    isProgress: boolean;
    error: null | string;
    result: null | Object;
}

export interface FetchActions {
    fetchResource: typeof fetchResource,
    getFirmware: typeof getFirmware,
    getLocalization: typeof getLocalization,
}

export const FETCH_START = 'fetch__start';
export const FETCH_SUCCESS = 'fetch__success';
export const FETCH_ERROR = 'fetch__error';

interface FetchStartAction {
    type: typeof FETCH_START,
    name: string,
}

interface FetchSuccessAction {
    type: typeof FETCH_SUCCESS,
    result: Object,
}

interface FetchErrorAction {
    type: typeof FETCH_ERROR,
    error: string,
}

export type FetchActionTypes = FetchStartAction | FetchSuccessAction | FetchErrorAction;