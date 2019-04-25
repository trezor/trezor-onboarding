import React from 'react';
import styled from 'styled-components';
import {
    H6, TrezorImage,
} from 'trezor-ui-components';
import { FormattedMessage } from '@dragonraider5/react-intl';

import types from 'config/types';
import { OptionsList } from 'components/Options';
import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from 'components/Wrapper';

import l10nMessages from './index.messages';

const OptionWrapper = styled.div`
    text-align: center
`;

const DEVICE_HEIGHT = 130;

const SelectDeviceStep = ({ onboardingActions, model }) => (
    <StepWrapper>
        <StepHeadingWrapper>
            <FormattedMessage {...l10nMessages.TR_SELECT_YOUR_DEVICE_HEADING} />
        </StepHeadingWrapper>
        <StepBodyWrapper>
            <OptionsList
                options={[{
                    content: (
                        <OptionWrapper>
                            <TrezorImage style={{ margin: '15px' }} model={1} height={DEVICE_HEIGHT} />
                            <H6><FormattedMessage {...l10nMessages.TR_MODEL_ONE} /></H6>
                        </OptionWrapper>
                    ),
                    value: 1,
                    key: 1,
                }, {
                    content: (
                        <OptionWrapper>
                            <TrezorImage style={{ margin: '15px' }} model={2} height={DEVICE_HEIGHT} />
                            <H6><FormattedMessage {...l10nMessages.TR_MODEL_T} /></H6>
                        </OptionWrapper>
                    ),
                    value: 2,
                    key: 2,
                }]}
                selected={model}
                onSelect={(value) => {
                    onboardingActions.selectTrezorModel(value);
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