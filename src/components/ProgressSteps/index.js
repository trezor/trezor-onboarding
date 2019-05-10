import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import types from 'config/proptypes';
import { ID } from 'constants/steps';
import ProgressStep from './components/ProgressStep';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
`;

const SECURITY_CLUSTER = [
    ID.BACKUP_STEP,
    ID.SET_PIN_STEP,
    ID.NAME_STEP,
    ID.BOOKMARK_STEP,
    ID.NEWSLETTER_STEP,
];

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
        const isSecurityActive = this.isSecurityActive();
        let steps = [];
        if (isSecurityActive) {
            steps = this.props.steps.reduce((accumulator, current) => {
                if (SECURITY_CLUSTER.includes(current.id) && !accumulator.find(item => item.title === current.title)) {
                    accumulator.push(current);
                }
                return accumulator;
            }, [{
                title: 'Basic setup',
            }]);
        } else {
            steps = this.props.steps.reduce((accumulator, current) => {
                if (!SECURITY_CLUSTER.includes(current.id) && !accumulator.find(item => item.title === current.title)) {
                    accumulator.push(current);
                }
                return accumulator;
            }, []);
            steps.push({
                title: 'Security',
                id: 'security',
            });
        }
        return steps.filter(step => step.title);
    }

    isSecurityActive() {
        return SECURITY_CLUSTER.includes(this.props.activeStep.id);
    }

    isStepFinished(steps, index, activeStep) {
        const activeStepIndex = steps.findIndex(s => s.title === activeStep.title);
        return activeStepIndex > index;
    }

    render() {
        const { isDisabled, onboardingActions, activeStep } = this.props;
        const steps = this.getStepsWithDots();

        return (
            <React.Fragment>
                <Wrapper>
                    { steps.map((step, index) => (
                        <React.Fragment key={`${step.id}-${step.title}`}>
                            <ProgressStep
                                isGoingForward={this.isGoingForward}
                                step={step}
                                index={index}
                                length={steps.length}
                                isActive={activeStep.title === step.title}
                                isFinished={this.isStepFinished(steps, index, activeStep)}
                                isLast={steps.length - 1 === index}
                                onboardingActions={onboardingActions}
                                changeOverHowManySteps={this.changeOverHowManySteps}
                                isDisabled={isDisabled}
                            />
                        </React.Fragment>
                    ))}
                </Wrapper>
            </React.Fragment>
        );
    }
}

ProgressSteps.propTypes = {
    activeStep: types.step.isRequired,
    steps: types.steps,
    onboardingActions: types.onboardingActions,
    isDisabled: PropTypes.bool,

};

export default ProgressSteps;