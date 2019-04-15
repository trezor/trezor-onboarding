import React from 'react';
import styled from 'styled-components';
import { P, H2, Button } from 'trezor-ui-components';
import { FormattedMessage } from '@dragonraider5/react-intl';
import PropTypes from 'prop-types';
import {
    IS_NOT_SAME_DEVICE, DEVICE_IS_NOT_CONNECTED, DEVICE_IS_NOT_USED_HERE, DEVICE_IS_IN_BOOTLOADER, DEVICE_IS_REQUESTING_PIN,
} from 'utils/rules';

import PinMatrix from 'views/onboarding/components/PinMatrix';
import l10nMessages from './index.messages';
import Reconnect from './Reconnect';
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
        <FormattedMessage {...l10nMessages.TR_DEVICE_YOU_RECONNECTED_IS_DIFFERENT} />
    </P>
);

const IsNotInBootloader = () => (
    <P>
        <FormattedMessage {...l10nMessages.TR_CONNECTED_DEVICE_IS_IN_BOOTLOADER} />
    </P>
);

const IsDeviceRequestingPin = ({ connectActions }) => (
    <React.Fragment>
        <H2>
            <FormattedMessage {...l10nMessages.TR_ENTER_PIN_HEADING} />
        </H2>
        <P>
            <FormattedMessage {...l10nMessages.TR_ENTER_PIN_TEXT} />
        </P>
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
        <H2>
            <FormattedMessage {...l10nMessages.TR_DEVICE_IS_USED_IN_OTHER_WINDOW_HEADING} />
        </H2>
        <P>
            <FormattedMessage {...l10nMessages.TR_DEVICE_IS_USED_IN_OTHER_WINDOW_TEXT} />
        </P>
        <ControlsWrapper>
            <Button onClick={connectActions.getFeatures}>
                <FormattedMessage {...l10nMessages.TR_DEVICE_IS_USED_IN_OTHER_WINDOW_BUTTON} />
            </Button>
        </ControlsWrapper>
    </React.Fragment>

);

const UnexpectedState = ({ caseType, model, connectActions }) => {
    switch (caseType) {
        case DEVICE_IS_NOT_CONNECTED:
            return <UnexpectedStateCommon><Reconnect model={model} loop /></UnexpectedStateCommon>;
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
