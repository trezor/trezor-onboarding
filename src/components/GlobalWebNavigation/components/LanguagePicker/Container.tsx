import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as onboardingActions from 'actions/onboardingActions';

import LanguagePicker from './index';

const mapStateToProps = state => ({
    language: state.onboarding.language,
});

const mapDispatchToProps = dispatch => ({
    setLocale: bindActionCreators(onboardingActions.setLocale, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguagePicker);
