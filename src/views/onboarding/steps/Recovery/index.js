import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
    P, Button,
} from 'trezor-ui-components';
import { FormattedMessage, injectIntl } from 'react-intl';

import Select, { createFilter } from 'react-select';

import { UI } from 'trezor-connect';

import bip39List from 'utils/bip39'; // todo: its not utils but constants I guess.
import types from 'config/types';
import colors from 'config/colors';
import { OptionsList } from 'components/Options';

import l10nCommonMessages from 'support/commonMessages';
import l10nMessages from './index.messages';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../components/Wrapper';

const sortedBip39 = bip39List.map(item => ({ label: item, value: item }));

// todo: if agreed on, refactor to animations.
const shake = keyframes`
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
`;

const SelectWrapper = styled.div`
    min-width: 400px;
    animation: ${shake} 1.3s;
    margin-top: 10px;
`;

class RecoveryStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'select-words-count',
            wordsCount: null,
            advancedRecovery: false,
            word: null,
        };
    }

    componentWillMount() {
        this.keyboardHandler = this.keyboardHandler.bind(this);
        window.addEventListener('keydown', this.keyboardHandler, false);
    }

    componentDidMount() {
        this.props.connectActions.resetCall();
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyboardHandler, false);
    }


    onWordChange = (item) => {
        this.setState({ word: item });
    }

    onSubmit = () => {
        if (this.state.word) {
            this.props.connectActions.submitWord({ word: this.state.word.value });
            this.setState({ word: null });
        }
    }

    setStatus = (status) => {
        this.setState(prevState => ({
            ...prevState,
            status,
        }));
    }

    getStatus = () => {
        const { deviceCall, uiInteraction } = this.props;
        // todo: better detection of success call;
        if (deviceCall.result && deviceCall.result.message === 'Device recovered') {
            return 'success';
        }
        if (deviceCall.name === 'recoveryDevice' && deviceCall.isProgress && uiInteraction.counter && uiInteraction.name === UI.REQUEST_WORD) {
            return 'recovering';
        }
        if (deviceCall.error) {
            return 'error';
        }
        return this.state.status;
    }

    recoveryDevice() {
        this.props.connectActions.recoveryDevice({
            word_count: this.state.wordsCount,
            // todo: enable passphraseProtection when problem with invoking passphrase request solved
            // todo: decide on case passhpraseProtection or passphrase_protection?
            // passhpraseProtection: true,
            pin_protection: false,
            type: this.state.advancedRecovery ? 1 : 0,
        });
    }

    keyboardHandler(event) {
        // 13 enter, 9 tab
        if (event.keyCode === 13 || event.keyCode === 9) {
            this.onSubmit();
        }
    }

    render() {
        const { deviceCall, uiInteraction, device } = this.props;

        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <FormattedMessage {...l10nMessages.TR_RECOVER_HEADING} />
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    { this.getStatus() === 'select-words-count' && (
                        <React.Fragment>
                            <P>
                                <FormattedMessage {...l10nMessages.TR_RECOVER_SUBHEADING} />
                            </P>

                            {
                                device.features.major_version === 1 && (
                                    <React.Fragment>

                                        <ControlsWrapper>
                                            <OptionsList
                                                options={[{
                                                    content: <div><P><FormattedMessage {...l10nMessages.TR_WORDS} values={{ count: '12' }} /></P></div>,
                                                    value: 12,
                                                    key: 1,
                                                }, {
                                                    content: <div><P><FormattedMessage {...l10nMessages.TR_WORDS} values={{ count: '18' }} /></P></div>,
                                                    value: 18,
                                                    key: 2,
                                                }, {
                                                    content: <div><P><FormattedMessage {...l10nMessages.TR_WORDS} values={{ count: '24' }} /></P></div>,
                                                    value: 24,
                                                    key: 3,
                                                }]}
                                                selected={this.state.wordsCount}
                                                selectedAccessor="value"
                                                onSelect={(value) => { this.setState({ wordsCount: value }); }}
                                            />
                                        </ControlsWrapper>

                                        <ControlsWrapper>
                                            <Button onClick={() => { this.setStatus('select-advanced-recovery'); }}>
                                                <FormattedMessage {...l10nCommonMessages.TR_CONTINUE} />
                                            </Button>
                                            <Button isWhite onClick={() => { this.props.onboardingActions.goToPreviousStep(); }}>
                                                <FormattedMessage {...l10nCommonMessages.TR_BACK} />
                                            </Button>
                                        </ControlsWrapper>
                                    </React.Fragment>
                                )
                            }

                            {
                                device.features.major_version === 2 && (
                                    <ControlsWrapper>
                                        <Button onClick={() => { this.props.connectActions.recoveryDevice(); }}>
                                            <FormattedMessage {...l10nMessages.TR_START_RECOVERY} />
                                        </Button>
                                    </ControlsWrapper>
                                )
                            }

                        </React.Fragment>
                    )}

                    { this.getStatus() === 'select-advanced-recovery' && (
                        <React.Fragment>
                            <P>
                                <FormattedMessage {...l10nMessages.TR_RECOVERY_TYPES_DESCRIPTION} />
                            </P>
                            <ControlsWrapper>
                                <OptionsList
                                    options={[{
                                        content: <P><FormattedMessage {...l10nMessages.TR_BASIC_RECOVERY_OPTION} /></P>,
                                        value: false,
                                        key: 1,
                                    }, {
                                        content: <P><FormattedMessage {...l10nMessages.TR_ADVANCED_RECOVERY_OPTION} /></P>,
                                        value: true,
                                        key: 2,
                                    }]}
                                    selected={this.state.advancedRecovery}
                                    selectedAccessor="value"
                                    onSelect={(value) => { this.setState({ advancedRecovery: value }); }}
                                />
                            </ControlsWrapper>

                            <ControlsWrapper>
                                <Button onClick={() => { this.recoveryDevice(); }}>
                                    <FormattedMessage {...l10nMessages.TR_START_RECOVERY} />
                                </Button>
                                <Button isWhite onClick={() => { this.setStatus('select-words-count'); }}>
                                    <FormattedMessage {...l10nCommonMessages.TR_BACK} />
                                </Button>
                            </ControlsWrapper>
                        </React.Fragment>
                    )}

                    {
                        this.getStatus() === 'recovering' && (
                            <React.Fragment>
                                <P>
                                    <FormattedMessage {...l10nMessages.TR_ENTER_SEED_WORDS_INSTRUCTION} />
                                    {' '}
                                    { this.state.wordsCount < 24 && <FormattedMessage {...l10nMessages.TR_RANDOM_SEED_WORDS_DISCLAIMER} values={{ count: 24 - this.state.wordsCount }} /> }
                                </P>
                                <SelectWrapper>
                                    <Select
                                        autoFocus
                                        isSearchable
                                        isClearable={false}
                                        value={this.state.word}
                                        onChange={this.onWordChange}
                                        placeholder={this.props.intl.formatMessage(l10nMessages.TR_CHECK_YOUR_DEVICE)}
                                        options={sortedBip39}
                                        filterOption={createFilter({
                                            ignoreCase: true,
                                            ignoreAccents: true,
                                            trim: true,
                                            matchFrom: 'start',
                                        })}

                                    />
                                </SelectWrapper>
                                {
                                    uiInteraction.counter > 1 && (
                                        <P size="small">
                                            <FormattedMessage {...l10nMessages.TR_MORE_WORDS_TO_ENTER} values={{ count: 25 - uiInteraction.counter }} />
                                        </P>
                                    )
                                }
                            </React.Fragment>
                        )
                    }

                    {
                        this.getStatus() === 'error' && (
                            <React.Fragment>
                                <P style={{ color: colors.error }}>
                                    <FormattedMessage {...l10nMessages.TR_RECOVERY_ERROR} values={{ error: deviceCall.error }} />
                                </P>

                                <Button onClick={() => { this.props.connectActions.resetCall(); this.setState({ status: 'select-words-count' }); }}>
                                    <FormattedMessage {...l10nCommonMessages.TR_RETRY} />
                                </Button>

                            </React.Fragment>
                        )
                    }

                    {
                        this.getStatus() === 'success' && (
                            <React.Fragment>
                                <P>
                                    <FormattedMessage {...l10nMessages.TR_RECOVERY_SUCCESS} />
                                </P>
                                <Button onClick={() => this.props.onboardingActions.goToNextStep()}>
                                    <FormattedMessage {...l10nCommonMessages.TR_CONTINUE} />
                                </Button>
                            </React.Fragment>
                        )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

RecoveryStep.propTypes = {
    connectActions: types.connectActions.isRequired,
    onboardingActions: types.onboardingActions.isRequired,
    deviceCall: types.deviceCall,
    uiInteraction: types.uiInteraction,
    device: types.device,
};

export default injectIntl(RecoveryStep);