import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTimeout from 'react-timeout';
import {
    P, H4, Button, Icon, icons,
} from 'trezor-ui-components';

import types from 'config/types';
import { TrezorConnect } from 'components/Prompts';
import { Dots } from 'components/Loaders';
import {
    StepWrapper, StepHeadingWrapper, StepBodyWrapper, ControlsWrapper,
} from '../../components/Wrapper';
import TroubleshootBootloader from './components/TroubleshootBootloader';
import TroubleshootInitialized from './components/TroubleshootInitialized';
import TroubleshootSearchingTooLong from './components/TroubleshootTooLong';

const TroubleShootWrapper = styled.div`
    max-width: 600px; /* todo: constant or refactor somehow */
`;

class ConnectStep extends React.PureComponent {
    static IS_SEARCHING_TIMEOUT = 1 * 1000;

    static IS_SEARCHING_TOO_LONG_TIMEOUT = 15 * 1000;

    constructor(props) {
        super(props);
        this.state = {
            isSearching: false,
            isSearchingTooLong: false,
        };
    }

    async componentDidMount() {
        // refresh device
        await this.props.connectActions.getFeatures();
        this.props.setTimeout(() => this.setState({ isSearching: true }), ConnectStep.IS_SEARCHING_TIMEOUT);
        this.props.setTimeout(() => this.setState({ isSearchingTooLong: true }), ConnectStep.IS_SEARCHING_TOO_LONG_TIMEOUT);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.device === null) {
            this.setState({ isSearching: true });
            this.props.setTimeout(() => this.setState({ isSearchingTooLong: true }), 15 * 1000);
        } else {
            this.setState({ isSearchingTooLong: false });
        }
    }

    isInBlWithFwPresent() {
        const { device } = this.props;
        if (!device) {
            return null;
        }
        return device.mode === 'bootloader' && device.features.firmware_present === true;
    }

    render() {
        const deviceIsConnected = Boolean(this.props.device && this.props.device.connected);
        const { device, deviceCall, connectActions } = this.props;
        const { isSearching, isSearchingTooLong } = this.state;
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    { !isSearching && 'Time to connect your device' }
                    { !deviceIsConnected && isSearching && !isSearchingTooLong && (
                        <React.Fragment>
                            Searching for your device<Dots />
                        </React.Fragment>
                    )}
                    {
                        deviceIsConnected && isSearching && 'Detected device'
                    }
                    {
                        !deviceIsConnected && isSearching && isSearchingTooLong && (
                            <React.Fragment>
                                    Searching takes too long<Dots />
                            </React.Fragment>
                        )
                    }
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        deviceIsConnected && isSearching
                            ? <Icon icon={icons.T1} size={64} />
                            : <TrezorConnect model={this.props.model} height={180} />
                    }

                    {
                        !isSearching && (
                            <React.Fragment>
                                <P>Make sure its well connected to avoid communication failures</P>
                            </React.Fragment>
                        )
                    }

                    {
                        !deviceIsConnected && isSearching && isSearchingTooLong && (
                            <TroubleshootSearchingTooLong />
                        )
                    }

                    {/* todo: rename TroubleshootWrapper */}

                    {
                        this.state.isSearching && deviceIsConnected && !deviceCall.isProgress && (
                            <TroubleShootWrapper>
                                {
                                    !device.features.initialized && this.isInBlWithFwPresent() === false && (
                                        <React.Fragment>
                                            <H4>Device detected</H4>
                                            <P>Found an empty device, yay! You can continue now.</P>
                                            <ControlsWrapper>
                                                <Button
                                                    onClick={() => this.props.onboardingActions.goToNextStep()}
                                                >
                                                Continue
                                                </Button>
                                            </ControlsWrapper>
                                        </React.Fragment>
                                    )
                                }

                                {
                                    this.isInBlWithFwPresent() && (<TroubleshootBootloader />)
                                }

                                {
                                    device.features.initialized && (<TroubleshootInitialized device={device} connectActions={connectActions} />)
                                }
                            </TroubleShootWrapper>
                        )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

ConnectStep.propTypes = {
    device: types.device,
    deviceCall: types.deviceCall,
    connectActions: types.connectActions,
    onboardingActions: types.onboardingActions.isRequired,
    model: PropTypes.string.isRequired,
    setTimeout: PropTypes.func.isRequired,
};

export default ReactTimeout(ConnectStep);