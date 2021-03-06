
import * as React from 'react';
import { connect } from 'react-redux';

import { IntlProvider, addLocaleData } from 'react-intl';

import en from 'react-intl/locale-data/en';
import cs from 'react-intl/locale-data/cs';
import bn from 'react-intl/locale-data/bn';
import de from 'react-intl/locale-data/de';
import el from 'react-intl/locale-data/el';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';
import id from 'react-intl/locale-data/id';
import it from 'react-intl/locale-data/it';
import ja from 'react-intl/locale-data/ja';
import nl from 'react-intl/locale-data/nl';
import pl from 'react-intl/locale-data/pl';
import pt from 'react-intl/locale-data/pt';
import ru from 'react-intl/locale-data/ru';
import uk from 'react-intl/locale-data/uk';
import zh from 'react-intl/locale-data/zh';

addLocaleData([
    ...en,
    ...cs,
    ...bn,
    ...de,
    ...el,
    ...es,
    ...fr,
    ...id,
    ...it,
    ...ja,
    ...nl,
    ...pl,
    ...pt,
    ...ru,
    ...uk,
    ...zh,
]);

interface Props {
    locale: string;
    messages: any;
    children: any;
}

const ReactIntlProvider: React.FunctionComponent<Props> = ({ children, locale, messages }) => (
    <IntlProvider
        locale={locale}
        messages={messages}
    >
        {children}
    </IntlProvider>
);

// todo: just quick experimenting here
interface State {
    onboarding: any;
    // selectedModel: any;
    // activeStepId: any;
    // activeSubStep: any;
    // language: any;
    // steps:any;
}

const mapStateToProps = (state: State) => ({
    locale: state.onboarding.language,
    messages: state.onboarding.messages,
});

export default connect(
    mapStateToProps,
    null,
)(ReactIntlProvider);