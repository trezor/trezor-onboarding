import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '@dragonraider5/react-intl';
import { P } from 'trezor-ui-components';

import { UnorderedList } from 'components/Lists';
import { TrezorConnect } from 'components/Prompts';

import l10nMessages from './Reconnect.messages';
import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper,
} from '../Wrapper';

const items = [{
    component: <P><FormattedMessage {...l10nMessages.TR_RECONNECT_TROUBLESHOOT_CONNECTION} /></P>,
    key: '1',
}, {
    component: <P><FormattedMessage {...l10nMessages.TR_RECONNECT_TROUBLESHOOT_CABEL} /></P>,
    key: '2',
}, {
    component: <P><FormattedMessage {...l10nMessages.TR_RECONNECT_TROUBLESHOOT_BRIDGE} /></P>,
    key: '3',
}];

const Reconnect = ({ model }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <FormattedMessage {...l10nMessages.TR_RECONNECT_HEADER} />
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <TrezorConnect model={model} loop />
            <P>
                <FormattedMessage {...l10nMessages.TR_RECONNECT_TEXT} />
            </P>
            <UnorderedList items={items} />
        </StepBodyWrapper>
    </StepWrapper>
);

Reconnect.propTypes = {
    model: PropTypes.number.isRequired,
};

export default Reconnect;