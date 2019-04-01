import * as NEWSLETTER from 'actions/constants/newsletter';
import { SUBMIT_EMAIL } from 'actions/constants/fetchCalls';
import {
    MAILCHIMP_U, MAILCHIMP_ID, MAILCHIMP_BASE, MAILCHIMP_GROUP_ID,
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
    let url = `${MAILCHIMP_BASE}/subscribe/post-json?u=${MAILCHIMP_U}&id=${MAILCHIMP_ID}`;
    Object.values(checkboxes).forEach((val, index) => {
        if (val) {
            url += `&group[${MAILCHIMP_GROUP_ID}][${index + 1}]=${index + 1}`;
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
