import React from 'react';
import ReactSVG from 'react-svg';
import { P, H4, Button } from 'trezor-ui-components';
import { FormattedMessage } from '@dragonraider5/react-intl';

import Text from 'views/onboarding/components/Text';

import types from 'config/types';
import { RESET_DEVICE } from 'actions/constants/calls';
import { OptionsList } from 'components/Options';
import { ID } from 'constants/steps';

import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper,
} from '../../components/Wrapper';
import CreateImg from './images/create-2.svg';
import RecoverImg from './images/recover-2.svg';

import l10nMessages from './index.messages';

const StartOption = () => (
    <React.Fragment>
        <P><FormattedMessage {...l10nMessages.TR_START_FROM_SCRATCH} /></P>
        <ReactSVG svgStyle={{ width: '100%' }} src={CreateImg} alt="create new wallet" />
    </React.Fragment>
);

const RecoverOption = () => (
    <React.Fragment>
        <P><FormattedMessage {...l10nMessages.TR_RECOVER} /></P>
        <ReactSVG svgStyle={{ width: '100%' }} src={RecoverImg} alt="recover wallet from seed" />
    </React.Fragment>
);

const StartStep = ({ isResolved, onboardingActions, connectActions }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <FormattedMessage {...l10nMessages.TR_START_HEADING} />
        </StepHeadingWrapper>
        <StepBodyWrapper>
            {
                !isResolved && (
                    <OptionsList
                        options={[{
                            content: <StartOption />,
                            value: ID.SECURITY_STEP,
                            key: 1,
                            onClick: () => {
                                connectActions.callActionAndGoToNextStep(RESET_DEVICE, null, ID.SECURITY_STEP, true, false);
                            },
                        }, {
                            content: <RecoverOption />,
                            value: ID.RECOVERY_STEP,
                            key: 2,
                            onClick: () => {
                                onboardingActions.goToNextStep(ID.RECOVERY_STEP);
                            },
                        }]}
                        selected={null}
                        selectedAccessor="value" // todo: maybe not needed
                    />
                )
            }

            {
                isResolved && (
                    <React.Fragment>
                        <H4>Step finished</H4>
                        <Text>You have already created a new wallet from scratch or through recovery.</Text>
                        <Button onClick={() => onboardingActions.goToNextStep()}>Continue</Button>
                    </React.Fragment>
                )
            }
        </StepBodyWrapper>
    </StepWrapper>
);

StartStep.propTypes = {
    connectActions: types.connectActions.isRequired,
    onboardingActions: types.onboardingActions.isRequired,
    deviceCall: types.deviceCall.isRequired,
};

export default StartStep;