/* @flow */

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
    Select, Link, Button, P,
} from 'trezor-ui-components';
import { FormattedMessage, injectIntl } from '@dragonraider5/react-intl';

import types from 'config/types';

import { Dots } from 'components/Loaders';
import Text from 'components/Text';

import l10nCommonMessages from 'support/commonMessages';
import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from 'components/Wrapper';

import l10nMessages from './index.messages';

const SelectWrapper = styled(Select)`
    margin-right: 10px;
    width: 180px;
`;

const Download = styled.div`
    margin: 24px auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
`;

const DownloadBridgeButton = styled(Button)`
    display: flex;
    align-items: center;
`;

class InstallBridge extends PureComponent {
    constructor(props) {
        super(props);
        const installers = this.getInstallers();
        this.state = {
            target: installers.find(i => i.preferred === true) || installers[0],
            uri: 'https://data.trezor.io/',
            installers,
        };
    }

    onChange(value) {
        this.setState({
            target: value,
        });
    }

    getStatus() {
        if (this.props.transport.type === 'bridge') {
            return 'installed';
        }
        return this.props.activeSubStep;
    }

    getInstallers() {
        return this.props.transport.bridge.packages.map(p => ({
            label: p.name,
            value: p.url,
            signature: p.signature,
            preferred: p.preferred,
        }));
    }

    download() {
        this.props.onboardingActions.goToSubStep('downloading');
    }

    render() {
        const { target, uri, installers } = this.state;
        const status = this.getStatus();

        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <FormattedMessage {...l10nMessages.TR_BRIDGE_HEADING} />
                </StepHeadingWrapper>
                <StepBodyWrapper>

                    <Text size="small">
                        { status === 'installed' && (
                            <FormattedMessage {...l10nMessages.TR_TREZOR_BRIDGE_IS_RUNNING_VERSION} values={{ version: this.props.transport.version }} />

                        )}
                        { status !== 'installed' && (
                            <FormattedMessage {...l10nMessages.TR_TREZOR_BRIDGE_IS_NOT_RUNNING} />
                        )}
                    </Text>

                    <Text>
                        <FormattedMessage {...l10nMessages.TR_BRIDGE_SUBHEADING} />
                    </Text>

                    {
                        status === null && (
                            <React.Fragment>
                                <P />
                                <Download>
                                    <SelectWrapper
                                        isSearchable={false}
                                        isClearable={false}
                                        value={target}
                                        onChange={v => this.onChange(v)}
                                        options={installers}
                                    />
                                    <Link href={`${uri}${target.value}`}>
                                        <DownloadBridgeButton onClick={() => this.download()}>
                                            <FormattedMessage {...l10nMessages.TR_DOWNLOAD} />
                                        </DownloadBridgeButton>
                                    </Link>
                                </Download>
                            </React.Fragment>
                        )
                    }

                    {
                        status === 'downloading' && (
                            <React.Fragment>

                                <Text>1.</Text>
                                <Text><FormattedMessage {...l10nMessages.TR_WAIT_FOR_FILE_TO_DOWNLOAD} /></Text>
                                {
                                    target.signature && (
                                        <Text>
                                            <Link href={uri + target.signature} isGreen>
                                                <FormattedMessage {...l10nMessages.TR_CHECK_PGP_SIGNATURE} />
                                            </Link>
                                        </Text>
                                    )
                                }
                                <Text>2.</Text>
                                <Text><FormattedMessage {...l10nMessages.TR_DOUBLE_CLICK_IT_TO_RUN_INSTALLER} /></Text>
                                <Text>3.</Text>
                                <Text>
                                    <FormattedMessage {...l10nMessages.TR_DETECTING_BRIDGE} />
                                    <Dots maxCount={3} />
                                </Text>
                            </React.Fragment>
                        )
                    }

                    {
                        status === 'installed' && (
                            <React.Fragment>
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

InstallBridge.propTypes = {
    onboardingActions: types.onboardingActions,
    transport: types.transport,
    activeSubStep: types.activeSubStep,
};

export default injectIntl(InstallBridge);
