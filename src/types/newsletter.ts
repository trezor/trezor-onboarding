import {
    toggleCheckbox,
    setEmail,
    submitEmail,
    setSkipped,
} from 'actions/newsletterActions';

export interface NewsletterReducer {
    email: string;
    skipped: boolean;
    checkboxes: Array<Checkbox>;
}

export interface NewsletterActions {
    toggleCheckbox: typeof toggleCheckbox,
    setEmail: typeof setEmail,
    submitEmail: typeof submitEmail,
    setSkipped: typeof setSkipped,
}

export interface Checkbox {
    value: boolean;
    label: string;
}

export const TOGGLE_CHECKBOX = 'newsletter__set__checkbox';
export const SET_EMAIL = 'newsletter__set__email';
export const SET_SKIPPED = 'newsletter__set__skipped';
export const SUBMIT_EMAIL = 'newsletter__submit__email';

interface ToggleCheckboxAction {
    type: typeof TOGGLE_CHECKBOX,
    checkbox: string,
}

interface SetEmailAction {
    type: typeof SET_EMAIL,
    email: string,
}

interface SetSkippedAction {
    type: typeof SET_SKIPPED,
    skipped: boolean,
}

export type NewsletterActionTypes = ToggleCheckboxAction | SetEmailAction | SetSkippedAction;