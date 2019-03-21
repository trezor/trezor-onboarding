import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
    P, Button, Select,
} from 'trezor-ui-components';
import { UI } from 'trezor-connect';

import bip39List from 'utils/bip39'; // todo: its not utils but constants I guess.
import types from 'config/types';
import colors from 'config/colors';
import { OptionsList } from 'components/Options';

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
            options: [{
                content: <P>12 words</P>,
                value: 12,
                key: 1,
            }, {
                content: <P>18 words</P>,
                value: 18,
                key: 2,
            }, {
                content: <P>24 words</P>,
                value: 24,
                key: 3,
            }],
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
        this.props.connectActions.submitWord({ word: this.state.word.value });
        this.setState({ word: null });
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
                    Recover your device
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    { this.getStatus() === 'select-words-count' && (
                        <React.Fragment>
                            <P>
                            It is possible to re-create device from bip39 backup. First of all, chose number of words of your
                            backup.
                            </P>

                            {
                                device.features.major_version === 1 && (
                                    <React.Fragment>

                                        <ControlsWrapper>

                                            <OptionsList
                                                options={this.state.options}
                                                selected={this.state.wordsCount}
                                                selectedAccessor="value"
                                                onSelect={(value) => { this.setState({ wordsCount: value }); }}
                                            />

                                        </ControlsWrapper>
                                        <ControlsWrapper>
                                            <Button onClick={() => { this.setStatus('select-advanced-recovery'); }}>
                                            Continue
                                            </Button>
                                            <Button isWhite onClick={() => { this.props.onboardingActions.goToPreviousStep(); }}>
                                            Back
                                            </Button>
                                        </ControlsWrapper>
                                    </React.Fragment>

                                )
                            }

                            {
                                device.features.major_version === 2 && (
                                    <ControlsWrapper>
                                        <Button onClick={() => { this.props.connectActions.recoveryDevice(); }}>
                                            Start recovery
                                        </Button>
                                    </ControlsWrapper>
                                )
                            }


                        </React.Fragment>
                    )}

                    { this.getStatus() === 'select-advanced-recovery' && (
                        <React.Fragment>
                            <P>
                            Both methods are safe. Basic recovery uses on computer input of words in randomized order.
                            Advanced recovery uses on-screen input to load your recovery seed. Learn more
                            </P>
                            <ControlsWrapper>
                                <OptionsList
                                    options={[{
                                        content: <P>Basic recovery (2 minutes)</P>,
                                        value: false,
                                        key: 1,
                                    }, {
                                        content: <P>Advanced recovery (5 minutes)</P>,
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
                                    Start recovery
                                </Button>
                                <Button isWhite onClick={() => { this.setStatus('select-words-count'); }}>
                                    Back
                                </Button>
                            </ControlsWrapper>
                        </React.Fragment>
                    )}

                    {
                        this.getStatus() === 'recovering' && (
                            <React.Fragment>
                                <P>Enter words from your seed in order displayed on your device.
                                    { this.state.wordsCount < 24 ? ` Please note, that your device will ask you to enter ${24 - this.state.wordsCount} fake words.` : null}
                                </P>
                                <SelectWrapper>
                                    <Select
                                        autoFocus
                                        isSearchable
                                        isClearable={false}
                                        value={this.state.word}
                                        onChange={this.onWordChange}
                                        placeholder="check your device"
                                        options={sortedBip39}
                                    />
                                </SelectWrapper>
                                {
                                    uiInteraction.counter > 1 && (
                                        <P size="small">
                                            {25 - uiInteraction.counter} more words to go.
                                        </P>
                                    )
                                }
                            </React.Fragment>
                        )
                    }

                    {
                        this.getStatus() === 'error' && (
                            <React.Fragment>
                                <P style={{ color: colors.error }}>Device recovery failed with error: {deviceCall.error}</P>
                                <Button onClick={() => { this.props.connectActions.resetCall(); this.setState({ status: 'select-words-count' }); }}>Retry</Button>

                            </React.Fragment>
                        )
                    }

                    {
                        this.getStatus() === 'success' && (
                            <React.Fragment>
                                <P>Excellent, you recovered device from seed</P>
                                <Button onClick={() => this.props.onboardingActions.goToNextStep()}>Continue</Button>
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

export default RecoveryStep;