import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
    P, Button, Select,
} from 'trezor-ui-components';
import { FormattedMessage, injectIntl } from '@dragonraider5/react-intl';
import { createFilter } from 'react-select';

import BlindMatrix from 'components/BlindMatrix';
import bip39List from 'utils/bip39'; // todo: its not utils but constants I guess.
import types from 'config/types';
import colors from 'config/colors';
import { RECOVER_DEVICE } from 'actions/constants/calls';
import { WORD_REQUEST_PLAIN, WORD_REQUEST_MATRIX9 } from 'actions/constants/events';
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
    componentWillMount() {
        this.keyboardHandler = this.keyboardHandler.bind(this);
        window.addEventListener('keydown', this.keyboardHandler, false);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyboardHandler, false);
    }

    onSubmit = () => {
        this.props.recoveryActions.submit();
    }

    setStatus = (status) => {
        this.setState(prevState => ({
            ...prevState,
            status,
        }));
    }

    getStatus = () => {
        const { deviceCall, uiInteraction } = this.props;
        if (deviceCall.result && deviceCall.name === RECOVER_DEVICE) {
            return 'success';
        }
        if (deviceCall.name === RECOVER_DEVICE && deviceCall.isProgress && uiInteraction.counter) {
            if (uiInteraction.name === WORD_REQUEST_PLAIN) {
                return 'recovering';
            }
            return 'recovering-advanced';
        }
        if (deviceCall.error && deviceCall.name === RECOVER_DEVICE) {
            return 'error';
        }
        return this.props.activeSubStep;
    }

    recoveryDevice() {
        this.props.connectActions.recoveryDevice();
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
                    { this.getStatus() === null && (
                        <React.Fragment>
                            <P>
                                <FormattedMessage {...l10nMessages.TR_RECOVER_SUBHEADING} />
                            </P>

                            {
                                device.features.major_version === 1 && (
                                    <React.Fragment>

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
                                            selected={this.props.recovery.wordsCount}
                                            selectedAccessor="value"
                                            onSelect={(value) => { this.props.recoveryActions.setWordsCount(value); }}
                                        />

                                        <ControlsWrapper>
                                            <Button
                                                isDisabled={this.props.recovery.wordsCount === null}
                                                onClick={() => { this.props.onboardingActions.goToSubStep('select-advanced-recovery'); }}
                                            >
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
                                    <React.Fragment>
                                        <P>On model T the entire recovery process is doable on device.</P>
                                        <ControlsWrapper>
                                            <Button onClick={() => { this.props.connectActions.recoveryDevice(); }}>
                                                <FormattedMessage {...l10nMessages.TR_START_RECOVERY} />
                                            </Button>
                                        </ControlsWrapper>
                                    </React.Fragment>

                                )
                            }

                        </React.Fragment>
                    )}

                    { this.getStatus() === 'select-advanced-recovery' && (
                        <React.Fragment>
                            <P>
                                <FormattedMessage {...l10nMessages.TR_RECOVERY_TYPES_DESCRIPTION} />
                            </P>
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
                                selected={this.props.recovery.advancedRecovery}
                                selectedAccessor="value"
                                onSelect={(value) => { this.props.recoveryActions.setAdvancedRecovery(value); }}
                            />

                            <ControlsWrapper>
                                <Button onClick={() => { this.recoveryDevice(); }}>
                                    <FormattedMessage {...l10nMessages.TR_START_RECOVERY} />
                                </Button>
                                <Button isWhite onClick={() => { this.props.onboardingActions.goToSubStep(null); }}>
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
                                    { this.props.recovery.wordsCount < 24 && <FormattedMessage {...l10nMessages.TR_RANDOM_SEED_WORDS_DISCLAIMER} values={{ count: 24 - this.props.recovery.wordsCount }} /> }
                                </P>
                                <SelectWrapper>
                                    <Select
                                        styles={{
                                            option: (provided, state) => ({
                                                ...provided,
                                                backgroundColor: state.isFocused ? colors.brandPrimary : provided.backgroundColor,
                                                color: colors.grayDark,
                                                textAlign: 'initial',
                                            }),
                                            control: (provided, state) => ({
                                                ...provided,
                                                boxShadow: `0 0 0 1px ${colors.brandPrimary}`,
                                                '&:hover': {
                                                    borderColor: colors.brandPrimary,
                                                },
                                                borderColor: state.isFocused ? colors.brandPrimary : 'transparent',
                                            }),
                                        }}
                                        autoFocus
                                        isSearchable
                                        isClearable={false}
                                        value={this.props.recovery.word}
                                        onChange={(item) => {
                                            this.props.recoveryActions.setWord(item.value);
                                            this.props.recoveryActions.submit();
                                        }}
                                        placeholder={this.props.intl.formatMessage(l10nMessages.TR_CHECK_YOUR_DEVICE)}
                                        options={sortedBip39}
                                        filterOption={createFilter({
                                            ignoreCase: true,
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
                        this.getStatus() === 'recovering-advanced' && (
                            <React.Fragment>
                                <BlindMatrix
                                    count={uiInteraction.name === WORD_REQUEST_MATRIX9 ? 9 : 6}
                                    onSubmit={this.props.recoveryActions.submit}
                                />
                            </React.Fragment>
                        )
                    }

                    {
                        this.getStatus() === 'error' && (
                            <React.Fragment>
                                <P style={{ color: colors.error }}>
                                    <FormattedMessage {...l10nMessages.TR_RECOVERY_ERROR} values={{ error: deviceCall.error }} />
                                </P>

                                <Button onClick={() => { this.props.connectActions.resetCall(); this.props.onboardingActions.goToSubStep(null); }}>
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
    activeSubStep: types.activeSubStep,
};

export default injectIntl(RecoveryStep);