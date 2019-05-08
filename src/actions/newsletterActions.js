import * as NEWSLETTER from 'actions/constants/newsletter';
import { SUBMIT_EMAIL } from 'actions/constants/fetchCalls';
import {
    MAILCHIMP_U, MAILCHIMP_ID, MAILCHIMP_BASE,
} from 'config/mailchimp';

import { fetchResource } from './fetchActions';

const toggleCheckbox = checkbox => ({
    type: NEWSLETTER.TOGGLE_CHECKBOX,
    checkbox,
});

const setEmail = email => ({
    type: NEWSLETTER.SET_EMAIL,
    email,
});

const setSkipped = () => ({
    type: NEWSLETTER.SET_SKIPPED,
});

const submitEmail = () => (dispatch, getState) => {
    const { email, checkboxes } = getState().newsletter;
    let url = `${MAILCHIMP_BASE}/subscribe/post-json?u=${MAILCHIMP_U}&id=${MAILCHIMP_ID}&group[1][1]=true&group[5][8]=true`;
    Object.values(checkboxes).forEach((checkbox, index) => {
        if (checkbox.value) {
            url += `&group[21][${2 ** (index + 5)}]=true`;
        }
    });
    url += `&EMAIL=${email}`;
    dispatch(fetchResource(SUBMIT_EMAIL, url));
};

export {
    toggleCheckbox,
    setEmail,
    submitEmail,
    setSkipped,
};
