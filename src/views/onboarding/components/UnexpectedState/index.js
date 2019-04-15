import React from 'react';
import styled from 'styled-components';
import { P, H2, Button } from 'trezor-ui-components';
import PropTypes from 'prop-types';
import {
    IS_NOT_SAME_DEVICE, DEVICE_IS_NOT_CONNECTED, DEVICE_IS_NOT_USED_HERE, DEVICE_IS_IN_BOOTLOADER, DEVICE_IS_REQUESTING_PIN,
} from 'utils/rules';

import PinMatrix from 'views/onboarding/components/PinMatrix';

import Reconnect from '../Reconnect';
import { ControlsWrapper } from '../Wrapper';

const Wrapper = styled.div`
    margin: auto 30px auto 30px;
    text-align: center;
    width: 100%;
`;

const UnexpectedStateCommon = ({ children }) => (
    <Wrapper>
        {children}
    </Wrapper>
);

UnexpectedStateCommon.propTypes = {
    children: PropTypes.element,
};

const IsSameDevice = () => (
    <P>
    Device you reconnected is different from the previous device.
    Connect the right one or refresh your internet browser and start again.
    </P>
);

const IsNotInBootloader = () => (
    <P>
        Connected device is in bootloader mode. Reconnect it to continue;
    </P>
);

const IsDeviceRequestingPin = ({ connectActions }) => (
    <React.Fragment>
        <H2>Enter PIN</H2>
        <PinMatrix onPinSubmit={
            (pin) => {
                console.warn('pin', pin, connectActions);
                connectActions.submitNewPin({ pin });
            }
        }
        />
    </React.Fragment>

);

const DeviceIsUsedHere = ({ connectActions }) => (
    <React.Fragment>
        <H2>Device is used in other window</H2>
        <P>
        This is a big no no. Please dont use device in other window. Close all other windows or tabs that might
        be using your Trezor device.
        </P>
        <ControlsWrapper>
            <Button onClick={connectActions.getFeatures}>Ok, I wont do it again</Button>
        </ControlsWrapper>
    </React.Fragment>

);

const UnexpectedState = ({ caseType, model, connectActions }) => {
    switch (caseType) {
        case DEVICE_IS_NOT_CONNECTED:
            return <UnexpectedStateCommon><Reconnect model={model} /></UnexpectedStateCommon>;
        case IS_NOT_SAME_DEVICE:
            return <UnexpectedStateCommon><IsSameDevice /></UnexpectedStateCommon>;
        case DEVICE_IS_IN_BOOTLOADER:
            return <UnexpectedStateCommon><IsNotInBootloader /></UnexpectedStateCommon>;
        case DEVICE_IS_REQUESTING_PIN:
            return <UnexpectedStateCommon><IsDeviceRequestingPin connectActions={connectActions} /></UnexpectedStateCommon>;
        case DEVICE_IS_NOT_USED_HERE:
            return <UnexpectedStateCommon><DeviceIsUsedHere connectActions={connectActions} /></UnexpectedStateCommon>;
        default:
            return <UnexpectedStateCommon>Error: {caseType}</UnexpectedStateCommon>;
    }
};

UnexpectedState.propTypes = {
    caseType: PropTypes.string.isRequired,
    model: PropTypes.number.isRequired,
};

export default UnexpectedState;
