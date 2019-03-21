import { connect } from 'react-redux';

import App from './index';

const mapStateToProps = state => ({
    error: state.onboarding.error,
    activeStep: state.onboarding.activeStep,
});

export default connect(
    mapStateToProps,
)(App);