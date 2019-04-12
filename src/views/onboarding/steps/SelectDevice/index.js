import React from 'react';
import styled from 'styled-components';
import { P, TrezorImage } from 'trezor-ui-components';
import { FormattedMessage } from '@dragonraider5/react-intl';

import types from 'config/types';
import { OptionsList } from 'components/Options';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../../components/Wrapper';
import l10nMessages from './index.messages';

const OptionWrapper = styled.div`
    text-align: center
`;

const SelectDeviceStep = ({ onboardingActions }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <FormattedMessage {...l10nMessages.TR_SELECT_YOUR_DEVICE_HEADING} />
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <OptionsList
                options={[{
                    content: (
                        <OptionWrapper>
                            <TrezorImage model={1} height={140} />
                            <P><FormattedMessage {...l10nMessages.TR_MODEL_ONE} /></P>
                        </OptionWrapper>
                    ),
                    value: '1',
                    key: 1,
                }, {
                    content: (
                        <OptionWrapper>
                            <TrezorImage model={2} height={140} />
                            <P><FormattedMessage {...l10nMessages.TR_MODEL_T} /></P>
                        </OptionWrapper>
                    ),
                    value: '2',
                    key: 2,
                }]}
                selectedAccessor="value"
                onSelect={(model) => {
                    onboardingActions.selectTrezorModel(model);
                    onboardingActions.goToNextStep();
                }}
            />
        </StepBodyWrapper>
    </StepWrapper>
);

SelectDeviceStep.propTypes = {
    onboardingActions: types.onboardingActions,
    model: types.model,
};

export default SelectDeviceStep;