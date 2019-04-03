import PropTypes from 'prop-types';

export default {
    device: PropTypes.object, // todo: improve;
    deviceCall: PropTypes.shape({
        name: PropTypes.string,
        isProgress: PropTypes.bool,
        error: PropTypes.string,
        result: PropTypes.shape({
            message: PropTypes.string,
        }),
    }),
    activeStepId: PropTypes.string,
    activeSubStep: PropTypes.string,
    deviceInteraction: PropTypes.shape({
        name: PropTypes.string,
        counter: PropTypes.number,
    }),
    uiInteraction: PropTypes.shape({
        name: PropTypes.string,
        counter: PropTypes.number,
    }),
    onboardingActions: PropTypes.objectOf(PropTypes.func), // todo: name all functions
    connectActions: PropTypes.objectOf(PropTypes.func), // todo: name all functions
    fetchActions: PropTypes.objectOf(PropTypes.func),
    transport: PropTypes.object, // todo: improve ?? not sure if needed.
    model: PropTypes.oneOf([1, 2]),
    fetchCall: PropTypes.shape({
        name: PropTypes.string,
        isProgress: PropTypes.bool,
        error: PropTypes.any,
        result: PropTypes.object,
    }),
};