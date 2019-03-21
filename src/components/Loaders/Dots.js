import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DotsWrapper = styled.span``;

const Dot = styled.span`
    &:before {
        content: '.'
    }
`;

class Dots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
        this.interval = null;
        this.willUnmount = false;
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.willUnmount) {
                return;
            }
            if (this.state.count < this.props.maxCount) {
                this.setState(prevState => ({ count: prevState.count + 1 }));
            } else {
                this.setState({ count: 0 });
            }
        }, this.props.speed);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <DotsWrapper>
                {/* eslint-disable-next-line react/no-array-index-key */}
                { (Array.from(new Array(this.props.maxCount)).map((item, index) => (<Dot key={`dot-${index}`} style={{ visibility: index < this.state.count ? 'visible' : 'hidden' }} />)))}
            </DotsWrapper>
        );
    }
}

Dots.defaultProps = {
    maxCount: 3,
    speed: 1000,
};

Dots.propTypes = {
    maxCount: PropTypes.number,
    speed: PropTypes.number,
};

export default Dots;