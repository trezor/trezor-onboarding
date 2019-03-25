/* @flow */

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
    Select, Link, Button, P,
} from 'trezor-ui-components';
import { FormattedMessage, injectIntl } from 'react-intl';

import colors from 'config/colors';
import { FONT_SIZE, FONT_WEIGHT } from 'config/constants';
import types from 'config/types';

import { UnorderedList } from 'components/Lists';
import { Dots } from 'components/Loaders';

import l10nCommonMessages from 'support/commonMessages';
import l10nMessages from './index.messages';

import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from '../../components/Wrapper';

const Version = styled.span`
    color: ${colors.GREEN_PRIMARY};
    padding: 6px 10px;
    border: 1px solid ${colors.GREEN_PRIMARY};
    border-radius: 3px;
    font-size: ${FONT_SIZE.BASE};
    font-weight: ${FONT_WEIGHT.LIGHT};
    margin-left: 24px;
`;

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
`;
class InstallBridge extends PureComponent {
    constructor(props) {
        super(props);
        const installers = this.getInstallers();
        this.state = {
            target: installers.find(i => i.preferred === true) || installers[0],
            uri: 'https://data.trezor.io/',
            installers,
            status: 'initial',
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
        return this.state.status;
    }

    getInstallers() {
        return this.props.transport.bridge.packages.map(p => ({
            label: p.name,
            value: p.url,
            signature: p.signature,
            preferred: p.preferred,
        }));
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
                    <Version>
                        { status === 'installed' ? this.props.transport.version : this.props.intl.formatMessage(l10nMessages.TR_NOT_RUNNING) }
                    </Version>
                </StepHeadingWrapper>
                <StepBodyWrapper>

                    {
                        status === 'initial' && (
                            <React.Fragment>
                                <P>
                                    <FormattedMessage {...l10nMessages.TR_BRIDGE_SUBHEADING} />
                                </P>
                                <Download>
                                    <SelectWrapper
                                        isSearchable={false}
                                        isClearable={false}
                                        value={target}
                                        onChange={v => this.onChange(v)}
                                        options={installers}
                                    />
                                    <Link href={`${uri}${target.value}`}>
                                        <DownloadBridgeButton onClick={() => this.setState({ status: 'downloading' })}>
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
                                <UnorderedList items={installInstructions} />
                                <DetectingWrapper>
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
                                <P>
                                    <FormattedMessage {...l10nMessages.TR_BRIDGE_IS_RUNNING} />
                                </P>
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
};

export default injectIntl(InstallBridge);
