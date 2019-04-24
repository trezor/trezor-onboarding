import React from 'react';
import styled from 'styled-components';
import { P, H2, Button } from 'trezor-ui-components';
import { FormattedMessage } from '@dragonraider5/react-intl';
import PropTypes from 'prop-types';

import { DISALLOWED_STATE } from 'constants/steps';
import types from 'config/types';
import PinMatrix from 'components/PinMatrix';

import l10nMessages from './index.messages';
import Reconnect from './Reconnect';
import { ControlsWrapper } from '../Wrapper';

const Wrapper = styled.div`
    margin: auto 30px auto 30px;
    text-align: center;
    width: 100%;
`;

const UnexpectedStateCommon = ({ children, onboardingActions }) => (
    <Wrapper>
        {children}
        <ControlsWrapper>
            <Button isWhite onClick={onboardingActions.startAgain}>Restart</Button>
        </ControlsWrapper>
    </Wrapper>
);

UnexpectedStateCommon.propTypes = {
    children: PropTypes.element,
    onboardingActions: types.onboardingActions,
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

IsDeviceRequestingPin.propTypes = {
    connectActions: types.connectActions,
};

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

DeviceIsUsedHere.propTypes = {
    connectActions: types.connectActions,
};

const UnexpectedState = ({
    caseType, model, connectActions, onboardingActions,
}) => {
    switch (caseType) {
        case DISALLOWED_STATE.DEVICE_IS_NOT_CONNECTED:
            return <UnexpectedStateCommon onboardingActions={onboardingActions}><Reconnect model={model} loop /></UnexpectedStateCommon>;
        case DISALLOWED_STATE.IS_NOT_SAME_DEVICE:
            return <UnexpectedStateCommon onboardingActions={onboardingActions}><IsSameDevice /></UnexpectedStateCommon>;
        case DISALLOWED_STATE.DEVICE_IS_IN_BOOTLOADER:
            return <UnexpectedStateCommon onboardingActions={onboardingActions}><IsNotInBootloader /></UnexpectedStateCommon>;
        case DISALLOWED_STATE.DEVICE_IS_REQUESTING_PIN:
            return <UnexpectedStateCommon onboardingActions={onboardingActions}><IsDeviceRequestingPin connectActions={connectActions} /></UnexpectedStateCommon>;
        case DISALLOWED_STATE.DEVICE_IS_NOT_USED_HERE:
            return <UnexpectedStateCommon onboardingActions={onboardingActions}><DeviceIsUsedHere connectActions={connectActions} /></UnexpectedStateCommon>;
        default:
            return <UnexpectedStateCommon onboardingActions={onboardingActions}>Error: {caseType}</UnexpectedStateCommon>;
    }
};

UnexpectedState.propTypes = {
    caseType: PropTypes.string.isRequired,
    model: types.selectedModel,
    connectActions: types.connectActions,
    onboardingActions: types.onboardingActions,
};

export default UnexpectedState;
