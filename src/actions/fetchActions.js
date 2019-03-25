import { FETCH_START, FETCH_ERROR, FETCH_SUCCESS } from 'actions/constants/fetch';
import { GET_FIRMWARE, SUBMIT_EMAIL, GET_LOCALIZATION } from 'actions/constants/fetchCalls';

const TREZOR_FIRMWARE_SRC_URL = 'https://beta-wallet.trezor.io/data/firmware';
const MAILCHIMP_URL = 'https://trezor.us7.list-manage.com/subscribe/post-json?u=a87eb6070c965ef1be1b02854&id=0ac8b24e69&c=?&group[1][2]=true&EMAIL=';

const getParams = (name) => {
    switch (name) {
        case GET_FIRMWARE:
            return { baseUrl: TREZOR_FIRMWARE_SRC_URL, options: { method: 'GET' } };
        case SUBMIT_EMAIL:
            return { baseUrl: MAILCHIMP_URL, options: { method: 'GET', mode: 'no-cors' } };
        case GET_LOCALIZATION:
            return { baseUrl: 'public/l10n/locales', options: { method: 'GET' } };
        default:
            throw new Error(`fetchCall ${name} is not defined`);
    }
};

const fetchResource = (name, url) => async (dispatch) => {
    dispatch({ type: FETCH_START, name });
    try {
        const params = getParams(name);
        const response = await fetch(params.baseUrl + url, params.options);
        // todo: response.status === 0 is cors-hack, cors doest allow us to read response status, we will need to use
        // mailchimp API directly.
        if (response.ok || response.status === 0) {
            dispatch({ type: FETCH_SUCCESS, result: response });
        } else {
            dispatch({ type: FETCH_ERROR, error: response.status });
        }
        return response;
    } catch (error) {
        dispatch({ type: FETCH_ERROR, error });
        return error;
    }
};

// todo: probably would be nicer to compose url from concrete params here instead of component
const getFirmware = url => fetchResource(GET_FIRMWARE, url);
const submitEmail = url => fetchResource(SUBMIT_EMAIL, url);
const getLocalization = url => fetchResource(GET_LOCALIZATION, url);


export {
    // abstract action
    fetchResource,
    // parametrized actions
    getFirmware,
    submitEmail,
    getLocalization,
};
