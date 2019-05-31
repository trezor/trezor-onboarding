import React from 'react';
import styled from 'styled-components';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { Header } from 'trezor-ui-components';
import { NAVBAR_HEIGHT, NAVBAR_HEIGHT_UNIT } from 'config/layout';
import {
    TREZOR_URL, SUPPORT_URL, WIKI_URL, BLOG_URL,
} from 'config/urls';

import l10nMessages from './index.messages';
import LanguagePicker from './components/LanguagePicker/Container';

const Wrapper = styled.div`
    max-height: ${NAVBAR_HEIGHT}${NAVBAR_HEIGHT_UNIT}
`;

const GlobalWebNavigation = ({ intl }: InjectedIntlProps) => (
    <Wrapper>
        <Header
            sidebarEnabled={false}
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
    </Wrapper>
);

export default injectIntl(GlobalWebNavigation);