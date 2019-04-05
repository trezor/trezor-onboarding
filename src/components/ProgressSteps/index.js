import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ProgressStep from './components/ProgressStep';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
`;

const isStepFinished = (steps, index, activeStep) => {
    const activeStepIndex = steps.findIndex(s => s === activeStep.title);
    return activeStepIndex > index;
};

class ProgressSteps extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.activeStep) {
            console.warn('this.props.steps', this.props.steps);
            const nextStepIndex = this.props.steps.findIndex(step => step === nextProps.activeStep.title);
            const currentStepIndex = this.props.steps.findIndex(step => step === this.props.activeStep.title);
            this.isGoingForward = nextStepIndex > currentStepIndex;
        }
    }

    render() {
        const { props } = this;
        return (
            <React.Fragment>
                <Wrapper>
                    {`isGoingForward: ${this.isGoingForward}`}
                    { props.steps.map((step, index) => (
                        <React.Fragment key={step}>
                            <ProgressStep
                                isGoingForward={this.isGoingForward}
                                step={step}
                                index={index}
                                isActive={props.activeStep.title === step}
                                isFinished={isStepFinished(props.steps, index, props.activeStep)}
                                isLast={props.steps.length - 1 === index}
                                onboardingActions={props.onboardingActions}
                            />
                        </React.Fragment>
                    ))}
                </Wrapper>
            </React.Fragment>
        );
    }
}

ProgressSteps.propTypes = {
    activeStep: PropTypes.object.isRequired, // todo: better
    steps: PropTypes.array.isRequired, // todo: better types string
};

export default ProgressSteps;