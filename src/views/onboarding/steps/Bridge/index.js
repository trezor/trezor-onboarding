/* @flow */

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
    Select, Link, Button, P,
} from 'trezor-ui-components';
import { FormattedMessage, injectIntl } from '@dragonraider5/react-intl';

import types from 'config/types';

import { Dots } from 'components/Loaders';

import l10nCommonMessages from 'support/commonMessages';
import l10nMessages from './index.messages';

import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from '../../components/Wrapper';

const SelectWrapper = styled(Select)`
    margin-right: 10px;
    width: 180px;
    margin-bottom: 5px;
`;

const Download = styled.div`
    margin: 24px auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
`;

const DownloadBridgeButton = styled(Button)`
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`;

const DetectingWrapper = styled.div`
    margin-top: 50px;
    /* text-align: center; */
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
        this.props.onboardingActions.toggleDownloadClicked();
    }

    render() {
        const { target, uri, installers } = this.state;
        const status = this.getStatus();
        const installInstructions = [{
            component: <P><FormattedMessage {...l10nMessages.TR_WAIT_FOR_FILE_TO_DOWNLOAD} /></P>,
            key: '1',
        }, {
            component: <P><FormattedMessage {...l10nMessages.TR_DOUBLE_CLICK_IT_TO_RUN_INSTALLER} /></P>,
            key: '2',
        }];
        if (target.signature) {
            installInstructions.push({
                component: (
                    <Link
                        href={uri + target.signature}
                        isGreen
                    >
                        <FormattedMessage {...l10nMessages.TR_CHECK_PGP_SIGNATURE} />
                    </Link>),
                key: '3',
            });
        }

        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <FormattedMessage {...l10nMessages.TR_BRIDGE_HEADING} />
                </StepHeadingWrapper>
                <StepBodyWrapper>

                    <P size="small">
                        { status === 'installed' && (
                            <span>Trezor Bridge is running. Version: {this.props.transport.version}</span>
                        )}
                        { status !== 'installed' && (
                            <span>Trezor Bridge is not running</span>
                        )}
                    </P>
                    <br />
                    <P style={{ textAlign: 'center' }}>
                        <FormattedMessage {...l10nMessages.TR_BRIDGE_SUBHEADING} />
                    </P>

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
                                {/* <UnorderedList items={installInstructions} /> */}

                                <DetectingWrapper>
                                    <P>1.</P>
                                    <P><FormattedMessage {...l10nMessages.TR_WAIT_FOR_FILE_TO_DOWNLOAD} /></P>
                                    <P>2.</P>
                                    <P><FormattedMessage {...l10nMessages.TR_DOUBLE_CLICK_IT_TO_RUN_INSTALLER} /></P>
                                    <P>3.</P>
                                    <P>
                                        <FormattedMessage {...l10nMessages.TR_DETECTING_BRIDGE} />
                                        <Dots maxCount={3} />
                                    </P>
                                </DetectingWrapper>
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
