import React from 'react';
import {
    H4, P, Button, Link,
} from 'trezor-ui-components';
import { SUPPORT_URL, SKIP_URL } from 'config/urls';
import colors from 'config/colors';
import types from 'config/types';

import { ControlsWrapper } from 'views/onboarding/components/Wrapper';

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
                            <H4>Device is initialized</H4>
                            <P>
                                Device label: {device.features.label}.
                                Firmware version: {device.features.major_version}.{device.features.minor_version}.{device.features.patch_version}
                            </P>
                            <ControlsWrapper>
                                <Button
                                    onClick={() => this.setState({ status: 'user-worked-before' })}
                                    isWhite
                                >
                                    I have worked with it before
                                </Button>
                                <Button
                                    onClick={() => this.setState({ status: 'is-brand-new' })}
                                    isWhite
                                >It is a brand new device, just unpacked
                                </Button>
                            </ControlsWrapper>
                        </React.Fragment>
                    )
                }

                {
                    status === 'user-worked-before' && (
                        <React.Fragment>
                            <H4>I have worked with this device before</H4>
                            <P>You might skip setup and continue to wallet or wipe your device
                                to be able to go through the onboarding process again.
                            </P>
                            <P style={{ color: colors.danger }}>
                            Danger zone here,
                                wiping device erases all data and can not be reverted
                            </P>
                            <ControlsWrapper>
                                <Button
                                    onClick={() => this.setState({ status: 'initial' })}
                                    isWhite
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={() => connectActions.wipeDevice()}
                                    isWhite
                                >
                                    Wipe device
                                </Button>
                                <Button isWhite>
                                    <Link href={SKIP_URL} target="_self">
                                        Skip to wallet
                                    </Link>
                                </Button>

                            </ControlsWrapper>
                        </React.Fragment>
                    )
                }

                {
                    status === 'is-brand-new' && (
                        <React.Fragment>
                            <H4>I have just unpacked the device from original box</H4>
                            <P>In that case you should immediately contact Trezor support with detailed information on
                            your purchase and refrain from using this device.
                            </P>
                            <ControlsWrapper>
                                <Button
                                    onClick={() => this.setState({ status: 'initial' })}
                                    isWhite
                                >
                                    Back
                                </Button>
                                <Link href={SUPPORT_URL}>
                                    <Button isWhite>Contact support</Button>
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