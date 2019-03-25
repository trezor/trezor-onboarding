import React from 'react';
import styled from 'styled-components';
import { P, TrezorImage } from 'trezor-ui-components';
import { FormattedMessage } from 'react-intl';

import types from 'config/types';
import { OptionsList } from 'components/Options';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../../components/Wrapper';
import l10nMessages from './index.messages';

const OptionWrapper = styled.div`
    text-align: center
`;

class SelectDeviceStep extends React.Component {
    static propTypes = types;

    constructor(props) {
        super(props);
        this.state = {
            options: [{
                content: (
                    <OptionWrapper>
                        <TrezorImage model={1} height={150} />
                        <P><FormattedMessage {...l10nMessages.TR_MODEL_ONE} /></P>
                    </OptionWrapper>
                ),
                value: '1',
                key: 1,
            }, {
                content: (
                    <OptionWrapper>
                        <TrezorImage model={2} height={150} />
                        <P><FormattedMessage {...l10nMessages.TR_MODEL_T} /></P>
                    </OptionWrapper>
                ),
                value: '2',
                key: 2,
            }],
        };
    }

    render() {
        console.warn('render');
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <FormattedMessage {...l10nMessages.TR_SELECT_YOUR_DEVICE_HEADING} />
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <OptionsList
                        options={this.state.options}
                        selected={this.props.model}
                        selectedAccessor="value"
                        onSelect={(model) => {
                            this.props.onboardingActions.selectTrezorModel(model);
                            this.props.onboardingActions.goToNextStep();
                        }}
                    />
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

SelectDeviceStep.propTypes = {
    onboardingActions: types.onboardingActions,
    model: types.model,
};

export default SelectDeviceStep;