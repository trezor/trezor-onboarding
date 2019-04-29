import { FETCH_START, FETCH_ERROR, FETCH_SUCCESS } from 'actions/constants/fetch';
import { GET_FIRMWARE, SUBMIT_EMAIL, GET_LOCALIZATION } from 'actions/constants/fetchCalls';

const getParams = (name) => {
    switch (name) {
        case GET_FIRMWARE:
            return { options: { method: 'GET' } };
        case SUBMIT_EMAIL:
            return { options: { method: 'GET', mode: 'no-cors' } };
        case GET_LOCALIZATION:
            return { options: { method: 'GET' } };
        default:
            throw new Error(`fetchCall ${name} is not defined`);
    }
};

const fetchResource = (name, url) => async (dispatch) => {
    dispatch({ type: FETCH_START, name });
    try {
        const params = getParams(name);
        console.warn(params);
        const response = await fetch(url, params.options);
        // response.status === 0 is cors-hack, cors doesnt allow us to read response status,
        // mailchimp api cant be used as well as it does not support CORS
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

const getFirmware = (urlSuffix) => {
    const TREZOR_FIRMWARE_SRC_URL = 'https://beta-wallet.trezor.io/data/firmware';
    return fetchResource(GET_FIRMWARE, TREZOR_FIRMWARE_SRC_URL + urlSuffix);
};

const getLocalization = url => fetchResource(GET_LOCALIZATION, `l10n/locales${url}`);

export {
    // abstract action
    fetchResource,
    // parametrized actions
    getFirmware,
    getLocalization,
};
