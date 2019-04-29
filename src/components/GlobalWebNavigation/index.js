import React from 'react';
import { injectIntl, intlShape } from '@dragonraider5/react-intl';

// import { SCREEN_SIZE } from 'config/variables';
import { Header } from 'trezor-ui-components';
import { NAVBAR_HEIGHT, NAVBAR_HEIGHT_UNIT } from 'config/layout';
import {
    TREZOR_URL, SUPPORT_URL, WIKI_URL, BLOG_URL,
} from 'config/urls';

import l10nMessages from './index.messages';
import LanguagePicker from './components/LanguagePicker/Container';

const GlobalWebNavigation = ({ intl }) => (
    <Header
        style={{ maxHeight: `${NAVBAR_HEIGHT}${NAVBAR_HEIGHT_UNIT}` }}
        rightAddon={<LanguagePicker />}
        links={[
            {
                href: TREZOR_URL,
                title: 'Trezor',
            },
            {
                href: WIKI_URL,
                title: intl.formatMessage(l10nMessages.TR_WIKI),
            },
            {
                href: BLOG_URL,
                title: intl.formatMessage(l10nMessages.TR_BLOG),
            },
            {
                href: SUPPORT_URL,
                title: intl.formatMessage(l10nMessages.TR_SUPPORT),
            },
        ]}
    />
);

GlobalWebNavigation.propTypes = {
    intl: intlShape,
};

export default injectIntl(GlobalWebNavigation);