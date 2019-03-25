import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { init } from 'actions/connectActions';

import App from './index';

const mapStateToProps = state => ({
    error: state.onboarding.error,
    activeStep: state.onboarding.activeStep,
});

const mapDispatchToProps = dispatch => ({
    init: bindActionCreators(init, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);