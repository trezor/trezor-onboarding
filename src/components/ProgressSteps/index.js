import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import types from 'config/types';
import ProgressStep from './components/ProgressStep';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
`;


class ProgressSteps extends React.Component {
    constructor() {
        super();
        this.changeOverHowManySteps = 0;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeStep) {
            const nextStepIndex = this.props.steps.findIndex(step => step.title === nextProps.activeStep.title);
            const currentStepIndex = this.props.steps.findIndex(step => step.title === this.props.activeStep.title);
            this.isGoingForward = nextStepIndex > currentStepIndex;
            this.changeOverHowManySteps = Math.abs(nextStepIndex - currentStepIndex);
        }
    }

    getStepsWithDots() {
        return this.props.steps.filter(step => step.title);
    }

    isStepFinished(index, activeStep) {
        const activeStepIndex = this.getStepsWithDots().findIndex(s => s.title === activeStep.title);
        return activeStepIndex > index;
    }

    render() {
        const { props } = this;
        console.warn(props);

        return (
            <React.Fragment>
                <Wrapper>
                    { this.getStepsWithDots().map((step, index) => (
                        <React.Fragment key={step.id}>
                            <ProgressStep
                                isGoingForward={this.isGoingForward}
                                step={step}
                                index={index}
                                length={props.steps.length}
                                isActive={props.activeStep.title === step.title}
                                isFinished={this.isStepFinished(index, props.activeStep)}
                                isLast={this.getStepsWithDots().length - 1 === index}
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