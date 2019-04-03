import React from 'react';
import { P } from 'trezor-ui-components';
import PropTypes from 'prop-types';
import { IS_SAME_DEVICE, DEVICE_IS_CONNECTED } from 'utils/rules';

import Reconnect from '../Reconnect';
import { StepWrapper, StepBodyWrapper } from '../Wrapper';

const UnexpectedStateCommon = ({ children }) => (
    <StepWrapper>
        <StepBodyWrapper>
            {children}
        </StepBodyWrapper>
    </StepWrapper>
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

const UnexpectedState = ({ caseType, model }) => {
    switch (caseType) {
        case DEVICE_IS_CONNECTED:
            return <UnexpectedStateCommon><Reconnect model={model} /></UnexpectedStateCommon>;
        case IS_SAME_DEVICE:
            return <UnexpectedStateCommon><IsSameDevice /></UnexpectedStateCommon>;
        default:
            return <UnexpectedStateCommon>Error: {caseType}</UnexpectedStateCommon>;
    }
};

UnexpectedState.propTypes = {
    caseType: PropTypes.string.isRequired,
    model: PropTypes.number.isRequired,
};

export default UnexpectedState;
