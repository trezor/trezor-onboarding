import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from 'config/colors';
import types from 'config/types';
import Line from './Line';

const ProgressStepWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    & :nth-child(4) {
        flex-basis: 100%;
        text-align: center;
    }
    flex-grow: 1;
`;

const Circle = styled.div` 
    border: 1.2px solid; 
    height: 12px;
    width: 12px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.82rem;
`;

const Text = styled.div`
    color: ${colors.brandPrimary};
    margin-top: 5px;
    font-size: 0.8rem;
`;

const LINE_TRANSITION_DURATION = 0.25;

const ProgressStep = (props) => {
    const color = props.isActive ? colors.brandPrimary : colors.gray;
    const transition = props.isActive ? `background-color 0.2s ${LINE_TRANSITION_DURATION * 2}s linear, color 0.2s ${LINE_TRANSITION_DURATION * 2}s linear, border-color 0.2s ${LINE_TRANSITION_DURATION * 2}s linear` : '';

    const borderColor = props.isActive || props.isFinished ? colors.brandPrimary : colors.gray;
    let backgroundColor;
    if (props.isActive) {
        backgroundColor = 'transparent';
    } else if (props.isFinished) {
        backgroundColor = colors.brandPrimary;
    }

    return (
        <ProgressStepWrapper>
            <Line
                transitionDuration={LINE_TRANSITION_DURATION}
                isActive={((!props.isFinished && !props.isActive) || props.index === 0)}
                order={1}
                isFirst={props.index === 0}
            />

            <Circle
                style={{
                    borderColor,
                    color,
                    backgroundColor,
                    transition,
                    cursor: props.isFinished ? 'pointer' : 'initial',
                }}
                onClick={props.isFinished ? () => { props.onboardingActions.goToNextStep(props.step); } : null}
            />

            <Line
                transitionDuration={LINE_TRANSITION_DURATION}
                isActive={!props.isFinished}
                order={0}
                isLast={props.isLast}
            />

            <Text
                style={{
                    color: props.isFinished || props.isActive ? colors.brandPrimary : colors.gray,
                    transition: props.isActive ? `color 0.2s ${LINE_TRANSITION_DURATION * 2}s linear` : '',
                    cursor: props.isFinished ? 'pointer' : 'initial',
                }}
                onClick={props.isFinished ? () => { props.onboardingActions.goToNextStep(props.step); } : null}
            >
                {props.step}
            </Text>
        </ProgressStepWrapper>
    );
};

ProgressStep.propTypes = {
    isActive: PropTypes.bool,
    isFinished: PropTypes.bool,
    isLast: PropTypes.bool,
    index: PropTypes.number.isRequired,
    step: PropTypes.string,
    onboardingActions: types.onboardingActions,
};

export default ProgressStep;