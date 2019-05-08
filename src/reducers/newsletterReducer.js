import {
    TOGGLE_CHECKBOX, SET_EMAIL, SET_SKIPPED,
} from 'actions/constants/newsletter';

/*
    this is how to submit to mailchimp.

    # Pass a list of key-value pairs to preserve the order of arguments
    args = OrderedDict([
        ('u', 'a87eb6070c965ef1be1b02854'),
        ('id', '0ac8b24e69'),
        ('c', ''),
        ('group[1][1]', 'true'),
        ('group[5][8]', 'true'),
        ('group[21][32]', 'true'), # If checkbox "Security Updates" is marked
        ('group[21][64]', 'true'), # If checkbox "Product Updates" is marked
        ('group[21][128]', 'true'), # If checkbox "Special Offers" is marked
        ('group[21][256]', 'true'), # If checkbox "Educational Content" is marked
        ('group[21][512]', 'true'), # If checkbox "Tech & Dev Corner" is marked
        ('EMAIL', user_email),
    ])
    url = 'https://trezor.us7.list-manage.com/subscribe/post-json'
 */

const initialState = {
    email: '',
    skipped: false,
    // note that order of elements in array is important, it defines how mailchimp understands subscription;
    checkboxes: [{
        value: true,
        label: 'Security updates',
    }, {
        value: true,
        label: 'Product updates',
    }, {
        value: true,
        label: 'Special offers',
    }, {
        value: true,
        label: 'Educational content',
    }, {
        value: true,
        label: 'Tech & Dev corner',
    }],
};


const newsletter = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CHECKBOX:
            return {
                ...state,
                checkboxes: state.checkboxes.map((checkbox) => {
                    const toggled = checkbox;
                    if (checkbox.label === action.checkbox) {
                        toggled.value = !checkbox.value;
                    }
                    return toggled;
                }),
            };
        case SET_EMAIL:
            return {
                ...state,
                email: action.email,
            };
        case SET_SKIPPED:
            return {
                ...state,
                skipped: true,
            };
        default:
            return state;
    }
};

export default newsletter;