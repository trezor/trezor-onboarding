import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from '@dragonraider5/react-intl';

// import { SCREEN_SIZE } from 'config/variables';
import { Link, Header } from 'trezor-ui-components';
import { NAVBAR_HEIGHT, NAVBAR_HEIGHT_UNIT } from 'config/layout';
import colors from 'config/colors';
import { TREZOR_URL } from 'config/urls';
import * as BREAKPOINTS from 'config/breakpoints';

import l10nMessages from './index.messages';
import LanguagePicker from './components/LanguagePicker/Container';

const Wrapper = styled.header`
    width: 100%;
    height: ${NAVBAR_HEIGHT}${NAVBAR_HEIGHT_UNIT};
    background: ${colors.black};
    z-index: 200;
`;

const LayoutWrapper = styled.div`
    width: 100%;
    height: 100%;
    max-width: 1170px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;   
    
    @media screen and (max-width: ${BREAKPOINTS.LG}px) {
        padding: 0 25px;
    }
`;

const TREZOR = styled.div``;
const T = styled.div``;

const Logo = styled.div`
    flex: 1;
    justify-content: flex-start;
    display: flex;
    ${T} {
        display: none;
        width: 20px;
    }
    ${TREZOR} {
        width: 100px;
    }
    svg {
        fill: ${colors.white};
        height: 28px;
    }
`;

const MenuLinks = styled.div`
    display: flex;
    align-content: center;
    justify-content: flex-end;
    flex: 0;
    height: 100%;
`;

const Projects = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    border-right: 1px solid ${colors.grayDark};
    padding-right: 24px;
    margin-right: 24px;
`;

const A = styled.a`
    color: ${colors.white};
    margin-left: 24px;
    transition: all 0.1s ease-in;
    white-space: nowrap;
    &:visited {
        color: ${colors.white};
        margin-left: 24px;
    }
    &:first-child {
        margin: 0px;
    }
    &:hover,
    &:active {
        color: ${colors.grayDark};
    }
`;

const GlobalWebNavigation = () => (
    <Header
        rightAddon={null}
        links={[
            {
                href: 'https://trezor.io/',
                title: 'Trezor'
            },
            {
                href: 'https://wiki.trezor.io/',
                title: 'Wiki'
            },
            {
                href: 'https://blog.trezor.io/',
                title: 'Blog'
            },
        ]}
    />
);

export default GlobalWebNavigation;