import { defineMessages } from 'react-intl';

const definedMessages = defineMessages({
    TR_HOLOGRAM_STEP_HEADING: {
        id: 'TR_HOLOGRAM_STEPHEADING',
        defaultMessage: 'Hologram check',
        description: 'Heading on hologram step page',
    },
    TR_HOLOGRAM_STEP_SUBHEADING: {
        id: 'TR_HOLOGRAM_STEP_SUBHEADING',
        defaultMessage: 'Please make sure hologram protecting your device is authentic',
        description: 'Subheading on hologram step page',
    },
    TR_HOLOGRAM_STEP_ACTION_OK: {
        id: 'TR_HOLOGRAM_STEP_ACTION_OK',
        defaultMessage: 'My hologram is OK',
        description: 'Button to click in allright case',
    },
    TR_HOLOGRAM_STEP_ACTION_NOT_OK: {
        id: 'TR_HOLOGRAM_STEP_ACTION_NOT_OK',
        defaultMessage: 'My hologram looks different',
        description: 'Button to click when hologram looks different',
    },
});


export default definedMessages;