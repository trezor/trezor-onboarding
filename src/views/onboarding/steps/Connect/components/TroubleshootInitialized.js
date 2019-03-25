import React from 'react';
import {
    H4, P, Button, Link,
} from 'trezor-ui-components';
import { FormattedMessage } from 'react-intl';

import { SUPPORT_URL, SKIP_URL } from 'config/urls';
import colors from 'config/colors';
import types from 'config/types';

import { ControlsWrapper } from 'views/onboarding/components/Wrapper';
import l10nCommonMessages from 'support/commonMessages';
import l10nMessages from './TroubleshootInitialized.messages';

class TroubleshootInitialized extends React.Component {
    constructor() {
        super();
        this.state = {
            status: 'initial',
        };
    }

    render() {
        const { device, connectActions } = this.props;
        const { status } = this.state;
        return (
            <React.Fragment>
                {
                    status === 'initial' && (
                        <React.Fragment>
                            <H4>
                                <FormattedMessage {...l10nMessages.TR_DEVICE_IS_INITIALIZED} />
                            </H4>
                            <P>
                                <FormattedMessage
                                    {...l10nMessages.TR_DEVICE_LABEL}
                                    values={{ label: device.features.label }}
                                />
                                <FormattedMessage
                                    {...l10nMessages.TR_DEVICE_FIRMWARE_VERSION}
                                    values={{
                                        firmware: `${device.features.major_version}.${device.features.minor_version}.${device.features.patch_version}`,
                                    }}
                                />
                            </P>
                            <ControlsWrapper>
                                <Button
                                    onClick={() => this.setState({ status: 'user-worked-before' })}
                                    isWhite
                                >
                                    <FormattedMessage {...l10nMessages.TR_USER_HAS_WORKED_WITH_THIS_DEVICE} />
                                </Button>
                                <Button
                                    onClick={() => this.setState({ status: 'is-brand-new' })}
                                    isWhite
                                >
                                    <FormattedMessage {...l10nMessages.TR_USER_HAS_NOT_WORKED_WITH_THIS_DEVICE} />
                                </Button>
                            </ControlsWrapper>
                        </React.Fragment>
                    )
                }

                {
                    status === 'user-worked-before' && (
                        <React.Fragment>
                            <H4>
                                <FormattedMessage {...l10nMessages.TR_USER_HAS_WORKED_WITH_THIS_DEVICE} />
                            </H4>
                            <P>
                                <FormattedMessage {...l10nMessages.TR_INSTRUCTION_TO_SKIP_OR_WIPE} />
                            </P>
                            <P style={{ color: colors.danger }}>
                                <FormattedMessage {...l10nMessages.TR_WIPE_WARNING} />
                            </P>
                            <ControlsWrapper>
                                <Button
                                    onClick={() => this.setState({ status: 'initial' })}
                                    isWhite
                                >
                                    <FormattedMessage {...l10nCommonMessages.TR_BACK} />
                                </Button>
                                <Button
                                    onClick={() => connectActions.wipeDevice()}
                                    isWhite
                                >
                                    <FormattedMessage {...l10nMessages.TR_WIPE_DEVICE} />
                                </Button>
                                <Button isWhite>
                                    <Link href={SKIP_URL} target="_self">
                                        <FormattedMessage {...l10nCommonMessages.TR_SKIP_ALL} />
                                    </Link>
                                </Button>
                            </ControlsWrapper>
                        </React.Fragment>
                    )
                }

                {
                    status === 'is-brand-new' && (
                        <React.Fragment>
                            <H4>
                                <FormattedMessage {...l10nMessages.TR_USER_HAS_NOT_WORKED_WITH_THIS_DEVICE} />
                            </H4>
                            <P>
                                <FormattedMessage {...l10nMessages.TR_USER_HAS_NOT_WORKED_WITH_THIS_DEVICE_INSTRUCTIONS} />
                            </P>
                            <ControlsWrapper>
                                <Button
                                    onClick={() => this.setState({ status: 'initial' })}
                                    isWhite
                                >
                                    <FormattedMessage {...l10nCommonMessages.TR_BACK} />
                                </Button>
                                <Link href={SUPPORT_URL}>
                                    <Button isWhite>
                                        <FormattedMessage {...l10nCommonMessages.TR_CONTACT_SUPPORT} />
                                    </Button>
                                </Link>
                            </ControlsWrapper>
                        </React.Fragment>
                    )
                }


            </React.Fragment>
        );
    }
}

TroubleshootInitialized.propTypes = {
    device: types.device,
    connectActions: types.connectActions,
};

export default TroubleshootInitialized;