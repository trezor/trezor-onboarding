import React from 'react';
import styled from 'styled-components';
import { P, H2, Button } from 'trezor-ui-components';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { DISALLOWED_STATE } from 'constants/steps';
import types from 'config/proptypes';
import PinMatrix from 'components/PinMatrix';
import Text from 'components/Text';

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

const IsDeviceRequestingPin = ({ connectActions, uiInteraction }) => (
    <React.Fragment>
        <H2>
            { uiInteraction.counter === 1 && <FormattedMessage {...l10nMessages.TR_ENTER_PIN_HEADING} /> }
            { uiInteraction.counter > 1 && 'Incorrect PIN entered' }
        </H2>
        <Text>
            {
                uiInteraction.counter === 1 && <FormattedMessage {...l10nMessages.TR_ENTER_PIN_TEXT} />
            }
            {
                uiInteraction.counter > 1 && 'You entered wrong PIN. To make sure, that your device can not be accessed by unauthorized person, it will get wiped after 16 incorrect entries.'
            }

        </Text>
        <PinMatrix onPinSubmit={
            (pin) => {
                connectActions.submitNewPin({ pin });
            }
        }
        />
    </React.Fragment>
);

IsDeviceRequestingPin.propTypes = {
    connectActions: types.connectActions,
    uiInteraction: types.uiInteraction,
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
    caseType, model, connectActions, onboardingActions, uiInteraction,
}) => {
    switch (caseType) {
        case DISALLOWED_STATE.DEVICE_IS_NOT_CONNECTED:
            return <UnexpectedStateCommon onboardingActions={onboardingActions}><Reconnect model={model} loop /></UnexpectedStateCommon>;
        case DISALLOWED_STATE.IS_NOT_SAME_DEVICE:
            return <UnexpectedStateCommon onboardingActions={onboardingActions}><IsSameDevice /></UnexpectedStateCommon>;
        case DISALLOWED_STATE.DEVICE_IS_IN_BOOTLOADER:
            return <UnexpectedStateCommon onboardingActions={onboardingActions}><IsNotInBootloader /></UnexpectedStateCommon>;
        case DISALLOWED_STATE.DEVICE_IS_REQUESTING_PIN:
            return <UnexpectedStateCommon onboardingActions={onboardingActions}><IsDeviceRequestingPin uiInteraction={uiInteraction} connectActions={connectActions} /></UnexpectedStateCommon>;
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
    uiInteraction: types.uiInteraction,
};

export default UnexpectedState;
