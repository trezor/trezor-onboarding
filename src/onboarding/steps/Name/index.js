import React from 'react';
import {
    Button, Input,
} from 'trezor-ui-components';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import types from 'config/types';
import { DEFAULT_LABEL } from 'constants/trezor';
import { validateASCII } from 'utils/validate';
import l10nCommonMessages from 'support/commonMessages';
import Text from 'components/Text';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from 'components/Wrapper';

import l10nMessages from './index.messages';

const NameInput = styled(Input)`
    max-width: 400px; 
    min-height: 65px;
`;

class NameStep extends React.Component {
    constructor() {
        super();
        this.state = {
            label: '',
        };
    }

    changeLabel = () => {
        const { label } = this.state;
        this.props.connectActions.applySettings({ label });
    }

    handleInputChange = (event) => {
        this.setState({ label: event.target.value });
    }

    getStatus = () => {
        const { device } = this.props;
        if (device.features.label !== DEFAULT_LABEL) {
            return 'changed';
        }
        return 'initial';
    }

    validateInput = () => {
        if (!this.state.label) {
            return { state: '' };
        }
        if (this.state.label === DEFAULT_LABEL) {
            return { state: 'error', bottomText: this.props.intl.formatMessage(l10nMessages.TR_NAME_BORING) };
        }
        if (!validateASCII(this.state.label)) {
            return { state: 'error', bottomText: this.props.intl.formatMessage(l10nMessages.TR_NAME_ONLY_ASCII) };
        }
        if (this.state.label.length > 16) {
            return { state: 'error', bottomText: this.props.intl.formatMessage(l10nMessages.TR_NAME_TOO_LONG) };
        }
        return { state: 'success', bottomText: this.props.intl.formatMessage(l10nMessages.TR_NAME_OK) };
    }

    render() {
        const { device } = this.props;
        const status = this.getStatus();
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    { status === 'initial' && <FormattedMessage {...l10nMessages.TR_NAME_HEADING} /> }
                    { status === 'changed' && <FormattedMessage {...l10nMessages.TR_NAME_HEADING_CHANGED} values={{ label: device.features.label }} /> }
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        status === 'initial' && (
                            <React.Fragment>
                                <Text>
                                    <FormattedMessage {...l10nMessages.TR_NAME_SUBHEADING} />
                                </Text>
                                <NameInput
                                    value={this.state.label}
                                    placeholder=""
                                    state={this.validateInput().state ? this.validateInput().state : null}
                                    bottomText={this.validateInput().bottomText ? this.validateInput().bottomText : ''}
                                    onChange={this.handleInputChange}
                                    isDisabled={this.props.deviceCall.isProgress}
                                />

                                <ControlsWrapper>
                                    <Button isDisabled={this.validateInput().state !== 'success'} onClick={this.changeLabel}>
                                        <FormattedMessage {...l10nCommonMessages.TR_SUBMIT} />
                                    </Button>
                                    <Button isWhite onClick={() => this.props.onboardingActions.goToNextStep()}>
                                        <FormattedMessage {...l10nCommonMessages.TR_SKIP} />
                                    </Button>
                                </ControlsWrapper>

                            </React.Fragment>
                        )
                    }

                    {
                        status === 'changed' && (
                            <React.Fragment>
                                <Text>
                                    <FormattedMessage {...l10nMessages.TR_NAME_CHANGED_TEXT} />
                                </Text>
                                <ControlsWrapper>
                                    <Button onClick={() => this.props.onboardingActions.goToNextStep()}>
                                        <FormattedMessage {...l10nCommonMessages.TR_CONTINUE} />
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

NameStep.propTypes = {
    connectActions: types.connectActions,
    onboardingActions: types.onboardingActions.isRequired,
    deviceCall: types.deviceCall.isRequired,
    device: types.deviceCall,
    intl: intlShape,
};

export default injectIntl(NameStep);