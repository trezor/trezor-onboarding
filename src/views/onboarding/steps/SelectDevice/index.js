import React from 'react';
import styled from 'styled-components';
import { P, TrezorImage } from 'trezor-ui-components';

import types from 'config/types';
import { OptionsList } from 'components/Options';

import { StepWrapper, StepHeadingWrapper, StepBodyWrapper } from '../../components/Wrapper';

const OptionWrapper = styled.div`
    text-align: center
`;

class SelectDeviceStep extends React.Component {
    static propTypes = types;

    constructor(props) {
        super(props);
        this.state = {
            options: [{
                content: <OptionWrapper><TrezorImage model={1} height={150} /><P>Model One</P></OptionWrapper>,
                // content: <P>Model One</P>
                value: '1',
                key: 1,
            }, {
                content: <OptionWrapper><TrezorImage model={2} height={150} /><P>Model T</P></OptionWrapper>,
                value: '2',
                key: 2,
            }],
        };
    }

    render() {
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    Select your device
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