import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H1, P } from 'trezor-ui-components';

import { UnorderedList } from 'components/Lists';
import { TrezorConnect } from 'components/Prompts';

const ReconnectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const items = [{
    component: <P>Device is not well connected to the cable</P>,
    key: '1',
}, {
    component: <P>Cable is broken, try another one</P>,
    key: '2',
}, {
    component: <P>Trezor bridge might have stopped working, try restarting</P>,
    key: '3',
}];

const Reconnect = ({ model }) => (
    <ReconnectWrapper>
        <H1>Reconnect your device</H1>
        <TrezorConnect model={model} />
        <P>
            We lost connection with your device. This might mean:
        </P>
        <UnorderedList items={items} />
    </ReconnectWrapper>
);

Reconnect.propTypes = {
    model: PropTypes.string.isRequired,
};

export default Reconnect;