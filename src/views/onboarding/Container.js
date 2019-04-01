import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as OnboardingActions from 'actions/onboardingActions';
import * as ConnectActions from 'actions/connectActions';
import * as FetchActions from 'actions/fetchActions';
import * as RecoveryActions from 'actions/recoveryActions';
import * as FirmwareUpdateActions from 'actions/firmwareUpdateActions';

import Onboarding from './index';

const mapStateToProps = state => ({
    // connect reducer
    device: state.connect.device,
    connectError: state.connect.connectError,
    transport: state.connect.transport,
    deviceCall: state.connect.deviceCall,
    deviceInteraction: state.connect.deviceInteraction,
    uiInteraction: state.connect.uiInteraction,

    // onboarding reducer
    selectedModel: state.onboarding.selectedModel,
    activeStep: state.onboarding.activeStep,
    activeSubStep: state.onboarding.activeSubStep,
    steps: state.onboarding.steps,

    // fetch reducer
    fetchCall: state.fetch,

    // recovery reducer
    recovery: state.recovery,

    // firmwareUpdate reducer
    firmwareUpdate: state.firmwareUpdate,
});

const mapDispatchToProps = dispatch => ({
    onboardingActions: bindActionCreators(OnboardingActions, dispatch),
    connectActions: bindActionCreators(ConnectActions, dispatch),
    fetchActions: bindActionCreators(FetchActions, dispatch),
    recoveryActions: bindActionCreators(RecoveryActions, dispatch),
    firmwareUpdateActions: bindActionCreators(FirmwareUpdateActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Onboarding);