import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import types from 'config/types';
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
    constructor() {
        super();
        this.changeOverHowManySteps = 0;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeStep) {
            const nextStepIndex = this.props.steps.findIndex(step => step === nextProps.activeStep.title);
            const currentStepIndex = this.props.steps.findIndex(step => step === this.props.activeStep.title);
            this.isGoingForward = nextStepIndex > currentStepIndex;
            this.changeOverHowManySteps = Math.abs(nextStepIndex - currentStepIndex);
        }
    }

    render() {
        const { props } = this;
        return (
            <React.Fragment>
                <Wrapper>
                    { props.steps.map((step, index) => (
                        <React.Fragment key={step}>
                            <ProgressStep
                                isGoingForward={this.isGoingForward}
                                step={step}
                                index={index}
                                length={props.steps.length}
                                isActive={props.activeStep.title === step}
                                isFinished={isStepFinished(props.steps, index, props.activeStep)}
                                isLast={props.steps.length - 1 === index}
                                onboardingActions={props.onboardingActions}
                                changeOverHowManySteps={this.changeOverHowManySteps}

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
    steps: types.steps,
};

export default ProgressSteps;