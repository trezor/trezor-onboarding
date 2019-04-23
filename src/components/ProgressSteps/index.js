import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import types from 'config/types';
import { ID } from 'constants/steps';
import ProgressStep from './components/ProgressStep';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
`;

// todo: move clustering logic here.
const INIT_DEVICE_CLUSTER = [
    ID.WELCOME_STEP,
    ID.SELECT_DEVICE_STEP,
    ID.UNBOXING_STEP,
    ID.BRIDGE_STEP,
    ID.FIRMWARE_STEP,
    ID.START_STEP,
    ID.RECOVERY_STEP,
];

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
        const isSecurityActive = SECURITY_CLUSTER.includes(this.props.activeStep.id);
        let steps = [];
        if (isSecurityActive) {
            steps = this.props.steps.reduce((accumulator, current) => {
                if (SECURITY_CLUSTER.includes(current.id) && !accumulator.find(item => item.title === current.title)) {
                    accumulator.push(current);
                }
                return accumulator;
            }, [{
                title: 'Basic setup',
                id: 'select-device',
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