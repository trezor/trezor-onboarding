import React from 'react';
import styled from 'styled-components';
import {
    P, Button, Link, Input,
} from 'trezor-ui-components';
import { Flags } from 'trezor-flags';
import { FormattedMessage, injectIntl } from 'react-intl';

import types from 'config/types';
import { SOCIAL_FACEBOOK_URL, SOCIAL_BLOG_URL, SOCIAL_TWITTER_URL } from 'config/urls';
import { IconSocial } from 'components/Icons';
import { validateEmail } from 'utils/validate';
import { SUBMIT_EMAIL } from 'actions/constants/fetchCalls';
import { APPLY_FLAGS } from 'actions/constants/calls';

import l10nCommonMessages from 'support/commonMessages';
import l10nMessages from './index.messages';

import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../components/Wrapper';

const SocialWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    margin-bottom: 30px;
    & * {
        margin: auto 8px auto 8px
    }
`;

// todo: currently the same InputWrapper used also in NameStep but wait for final design decision
const InputWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    height: 70px;
`;

class NewsleterStep extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            skipped: null,
        };
    }

    getBottomText() {
        const { emailSendStatus } = this.state;
        if (emailSendStatus === 'sending') {
            return this.props.intl.formatMessage(l10nMessages.TR_SENDING);
        }
        if (emailSendStatus === 'error') {
            return this.props.intl.formatMessage(l10nMessages.TR_SENDING_ERROR);
        }
        return this.validateInput().bottomText;
    }

    getEmailStatus() {
        const { fetchCall } = this.props;
        if (fetchCall.name === SUBMIT_EMAIL && fetchCall.isProgress) {
            return 'sending';
        }
        if ((fetchCall.name === SUBMIT_EMAIL && fetchCall.result) || this.state.skipped) {
            return 'success';
        }
        if (fetch.name === SUBMIT_EMAIL && fetch.error) {
            return 'error';
        }
        return null;
    }

    getStatus() {
        const { fetchCall } = this.props;
        if ((fetchCall.name === SUBMIT_EMAIL && fetchCall.result) || this.state.skipped) {
            return 'socials';
        }
        return 'initial';
    }

    validateInput = () => {
        if (!this.state.email) {
            return { state: null };
        }
        if (!validateEmail(this.state.email)) {
            return { state: 'error', bottomText: this.props.intl.formatMessage(l10nMessages.TR_WRONG_EMAIL_FORMAT) };
        }
        return { state: 'success' };
    }

    handleInputChange = (event) => {
        this.setState({ email: event.target.value });
    }

    goToNextStep = () => {
        this.props.connectActions.callActionAndGoToNextStep(APPLY_FLAGS, {
            flags: Flags.setFlag('hasEmail', this.props.device.features.flags),
        });
    }

    submitEmail = () => {
        this.props.fetchActions.submitEmail(this.state.email);
    }

    skipEmail() {
        this.setState({ skipped: true });
    }

    render() {
        const status = this.getStatus();
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <FormattedMessage {...l10nMessages.TR_NEWSLETTER_HEADING} />
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        status === 'initial' && (
                            <React.Fragment>
                                <P>
                                    <FormattedMessage {...l10nMessages.TR_NEWSLETTER_SUBHEADING} />
                                </P>
                                <InputWrapper>
                                    <Input
                                        value={this.state.email}
                                        placeholder="Email"
                                        state={this.validateInput().state}
                                        bottomText={this.getBottomText()}
                                        onChange={this.handleInputChange}
                                        isDisabled={this.getEmailStatus() === 'sending'}
                                    />
                                </InputWrapper>
                                <ControlsWrapper>
                                    <Button isWhite onClick={() => this.skipEmail()}>
                                        <FormattedMessage {...l10nCommonMessages.TR_SKIP} />
                                    </Button>
                                    <Button
                                        isDisabled={this.validateInput().state !== 'success' || this.getEmailStatus() === 'sending'}
                                        onClick={this.submitEmail}
                                    >
                                        <FormattedMessage {...l10nCommonMessages.TR_SUBMIT} />
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        status === 'socials' && (
                            <React.Fragment>
                                {
                                    !this.state.skipped && (
                                        <P>
                                            <FormattedMessage {...l10nMessages.TR_THANK_YOU_FOR_EMAIL} />
                                        </P>
                                    )
                                }
                                {
                                    this.state.skipped && (
                                        <P>
                                            <FormattedMessage {...l10nMessages.TR_EMAIL_SKIPPED} />
                                        </P>
                                    )
                                }
                                <SocialWrapper>
                                    <Link href={SOCIAL_BLOG_URL}>
                                        <IconSocial name="medium" sizeMultiplier={2} />
                                    </Link>
                                    <Link href={SOCIAL_FACEBOOK_URL}>
                                        <IconSocial name="facebook" sizeMultiplier={2} />
                                    </Link>
                                    <Link href={SOCIAL_TWITTER_URL}>
                                        <IconSocial name="twitter" sizeMultiplier={2} />
                                    </Link>
                                </SocialWrapper>
                                <ControlsWrapper>
                                    <Button onClick={() => this.goToNextStep()}>
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

NewsleterStep.propTypes = {
    connectActions: types.connectActions.isRequired,
    fetchActions: types.fetchActions.isRequired,
    fetchCall: types.fetchCall,
    device: types.device,
};

export default injectIntl(NewsleterStep);