import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { State } from 'types/redux';
import * as OnboardingActions from 'actions/onboardingActions';
import * as ConnectActions from 'actions/connectActions';
import * as FetchActions from 'actions/fetchActions';
import * as RecoveryActions from 'actions/recoveryActions';
import * as FirmwareUpdateActions from 'actions/firmwareUpdateActions';
import * as NewsletterActions from 'actions/newsletterActions';

import Onboarding from './index';
import { Dispatch } from 'types/redux';

const mapStateToProps = (state: State) => ({
    // connect reducer
    device: state.connect.device,
    prevDeviceId: state.connect.prevDeviceId,
    connectError: state.connect.connectError,
    transport: state.connect.transport,
    deviceCall: state.connect.deviceCall,
    deviceInteraction: state.connect.deviceInteraction,
    uiInteraction: state.connect.uiInteraction,

    // onboarding reducer
    selectedModel: state.onboarding.selectedModel,
    activeStepId: state.onboarding.activeStepId,
    activeSubStep: state.onboarding.activeSubStep,
    steps: state.onboarding.steps,

    // fetch reducer
    fetchCall: state.fetch,

    // recovery reducer
    recovery: state.recovery,

    // firmwareUpdate reducer
    firmwareUpdate: state.firmwareUpdate,

    // newsletter reducer
    newsletter: state.newsletter,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onboardingActions: bindActionCreators(OnboardingActions, dispatch),
    connectActions: bindActionCreators(ConnectActions, dispatch),
    fetchActions: bindActionCreators(FetchActions, dispatch),
    recoveryActions: bindActionCreators(RecoveryActions, dispatch),
    firmwareUpdateActions: bindActionCreators(FirmwareUpdateActions, dispatch),
    newsletterActions: bindActionCreators(NewsletterActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Onboarding);