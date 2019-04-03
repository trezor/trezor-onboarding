import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { P } from 'trezor-ui-components';

import { UnorderedList } from 'components/Lists';
import { TrezorConnect } from 'components/Prompts';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../Wrapper';

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
    <StepWrapper>
        <StepHeadingWrapper>
        Reconnect your device
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <TrezorConnect model={model} />
            <P>
            We lost connection with your device. This might mean:
            </P>
            <UnorderedList items={items} />
        </StepBodyWrapper>
    </StepWrapper>
);

Reconnect.propTypes = {
    model: PropTypes.number.isRequired,
};

export default Reconnect;