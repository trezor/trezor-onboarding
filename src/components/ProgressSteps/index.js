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
        const steps = this.props.steps.reduce((accumulator, current) => {
            if (!accumulator.find(item => item.title === current.title)) {
                if (this.props.activeClusterId === current.cluster) {
                    accumulator.push(current);
                } else if (!accumulator.find(item => item.cluster === current.cluster)) {
                    accumulator.push({
                        title: current.cluster,
                        id: current.id,
                        cluster: current.cluster,
                    });
                }
            }
            return accumulator;
        }, []);

        return steps.filter(step => step.title);
    }

    isStepFinished(steps, index, activeStep) {
        const activeStepIndex = steps.findIndex(s => s.title === activeStep.title);
        return activeStepIndex > index;
    }

    render() {
        const { props } = this;
        const steps = this.getStepsWithDots();

        return (
            <React.Fragment>
                <Wrapper>
                    { steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <ProgressStep
                                isGoingForward={this.isGoingForward}
                                step={step}
                                index={index}
                                length={props.steps.length}
                                isActive={props.activeStep.title === step.title}
                                isFinished={this.isStepFinished(steps, index, props.activeStep)}
                                isLast={steps.length - 1 === index}
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
    activeClusterId: types.activeClusterId,
};

export default ProgressSteps;