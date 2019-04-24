import React from 'react';
import styled from 'styled-components';
import Proptypes from 'prop-types';
import { P, Button } from 'trezor-ui-components';
import { ControlsWrapper } from 'components/Wrapper';

import ErrorLogService from 'support/ErrorLogService';
import { isBeta, isProduction, isDevelopment } from 'support/build';
import BugImage from './images/bug.png';

const ErrorWrapper = styled.div`
    margin-top: auto;
    margin-bottom: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`;

const Bug = styled.div`
    background-image: url(${BugImage});
    background-color: transparent;
    background-size: contain;
    background-repeat: no-repeat;
    width: 200px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: auto;
`;

const Message = styled(P)`
    padding: 30px;
    max-width: 600px;
    /* todo: some constant for max-width */
`;

const Attribution = styled(P)`
    margin-top: auto;
`;

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error) {
        this.setState({ error });
    }

    reload() {
        window.location.reload();
    }

    render() {
        const error = this.state.error || this.props.error;
        if (error) {
            return (
                <ErrorWrapper>
                    <Bug />
                    <Message>
                        Unfortunately, a bug occured.
                        While you read this, our developers are already being tortured by their masters.
                        {
                            isProduction() && (
                                ' As we value our customers privacy our app does not collect any information, so we would appreciate if you sent us a crash report.'
                            )
                        }

                        {
                            isBeta() && (
                                ' Crash report was sent to our team and we will address this issue as fast as possible.'
                            )
                        }

                        {
                            isDevelopment() && (
                                ' As this is a developmnet build, no log was sent to a logging service.'
                            )
                        }

                        {/* todo: nicer */}
                        {/* todo [slush]: send to support instead of sentry?  */}
                        <br /><br />
                        <span style={{ color: 'red' }}>
                            Error details: <br />
                            { error.message } <br />
                        </span>

                    </Message>

                    <ControlsWrapper>
                        {
                            !isDevelopment() && (
                                <Button onClick={() => ErrorLogService.showReportDialog()}>Report problem</Button>
                            )
                        }
                        <Button isWhite onClick={() => this.reload()}>Reload application</Button>
                    </ControlsWrapper>
                    <Attribution>
                        ^^Fancy bug icon by Font Awesome Free 5.2.0 by @fontawesome - https://fontawesome.com
                    </Attribution>
                </ErrorWrapper>
            );
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: Proptypes.node.isRequired,
    error: Proptypes.object,
};

export default ErrorBoundary;