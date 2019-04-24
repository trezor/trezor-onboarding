import React from 'react';
import styled from 'styled-components';
import { Flags } from 'trezor-flags';
import Platform from 'utils/Platform';

import {
    Link, Button,
} from 'trezor-ui-components';
import { FormattedMessage } from '@dragonraider5/react-intl';

import { APPLY_FLAGS } from 'actions/constants/calls';
import l10nCommonMessages from 'support/commonMessages';
import { PHISHING_URL } from 'config/urls';
import types from 'config/types';
import Key from 'components/Key';
import Text from 'components/Text';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from 'components/Wrapper';

import l10nMessages from './index.messages';

const Keys = styled.div`
    display: flex;
`;
class BookmarkStep extends React.Component {
    static TARGET_FLAG = 'hasBookmark';

    static D_KEY = 68;

    static CTRL_KEY = 17;

    constructor() {
        super();
        this.state = {
            keys: {},
        };
    }

    componentWillMount() {
        this.keyboardHandler = this.keyboardHandler.bind(this);
        window.addEventListener('keydown', this.keyboardHandler, false);
        window.addEventListener('keyup', this.keyboardHandler, false);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyboardHandler, false);
        window.removeEventListener('keyup', this.keyboardHandler, false);
    }

    setBookmarkFlagAndContinue() {
        const flags = Flags.setFlag(BookmarkStep.TARGET_FLAG, this.props.device.features.flags);
        this.props.connectActions.callActionAndGoToNextStep(APPLY_FLAGS, { flags });
    }

    keyboardHandler(e) {
        const { keys } = this.state;
        if (e.type === 'keydown') {
            keys[e.keyCode] = true;
        } else if (e.type === 'keyup') {
            keys[e.keyCode] = false;
        }
        this.setState({ keys });
    }

    nextDisabled() {
        const { keys } = this.state;
        return !keys[BookmarkStep.D_KEY] || !keys[BookmarkStep.CTRL_KEY];
    }

    render() {
        const { keys } = this.state;
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <FormattedMessage {...l10nMessages.TR_BOOKMARK_HEADING} />
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    <Text>
                        <FormattedMessage
                            {...l10nMessages.TR_BOOKMARK_SUBHEADING}
                            values={{
                                TR_PHISHING_ATTACKS: (
                                    <Link isGreen href={PHISHING_URL}>
                                        <FormattedMessage {...l10nMessages.TR_PHISHING_ATTACKS} />
                                    </Link>
                                ),
                            }}
                        />
                    </Text>

                    {
                        !Platform.getInfo().isMobile && (
                            <React.Fragment>
                                <Text>
                                    <FormattedMessage {...l10nMessages.TR_USE_THE_KEYBOARD_SHORTCUT} />
                                </Text>
                                <Keys>
                                    <Key
                                        isPressed={keys[BookmarkStep.CTRL_KEY] === true}
                                        text={Platform.getInfo().os === Platform.MAC ? '⌘' : 'Ctrl'}
                                    />
                                    <div style={{ width: '10px' }} />
                                    <Key isPressed={keys[BookmarkStep.D_KEY] === true} text="D" />
                                </Keys>
                            </React.Fragment>
                        )
                    }

                    <ControlsWrapper>
                        {
                            !Platform.getInfo().isMobile && (
                                <React.Fragment>
                                    <Button isDisabled={this.nextDisabled()} onClick={() => this.setBookmarkFlagAndContinue()}>
                                        <FormattedMessage {...l10nCommonMessages.TR_CONTINUE} />
                                    </Button>
                                    <Button isWhite onClick={() => this.setBookmarkFlagAndContinue()}>
                                        <FormattedMessage {...l10nCommonMessages.TR_SKIP} />
                                    </Button>
                                </React.Fragment>
                            )
                        }
                        {/*  todo: for mobile add to homescreen */}
                        {
                            Platform.getInfo().isMobile && (
                                <React.Fragment>
                                    <Button onClick={() => this.setBookmarkFlagAndContinue()}>
                                        <FormattedMessage {...l10nCommonMessages.TR_CONTINUE} />
                                    </Button>
                                    <Button isWhite onClick={() => this.setBookmarkFlagAndContinue()}>
                                        <FormattedMessage {...l10nCommonMessages.TR_SKIP} />
                                    </Button>
                                </React.Fragment>
                            )
                        }
                    </ControlsWrapper>
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

BookmarkStep.propTypes = {
    connectActions: types.connectActions,
    onboardingActions: types.onboardingActions,
    device: types.device,
};

export default BookmarkStep;
