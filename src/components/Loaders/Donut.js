import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, icons } from 'trezor-ui-components';

import colors from 'config/colors';

const DonutWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DonutContent = styled.div`
    position: absolute
`;

class Donut extends React.Component {
    isMounted = false;

    componentDidMount() {
        this.isMounted = true;
    }

    componentWillUnmount() {
        this.isMounted = false;
    }

    progress = percent => this.circumference(this.normalizeRadius()) - percent / 100 * this.circumference(this.normalizeRadius());

    circumference = radius => radius * 2 * Math.PI;

    normalizeRadius = () => this.props.radius - this.props.stroke;

    render() {
        const style = {
            transition: 'stroke-dashoffset 0.05s',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            strokeDashoffset: `${this.progress(this.props.progress)}`,
            strokeDasharray: `${this.circumference(this.normalizeRadius())}  ${this.circumference(this.normalizeRadius())}`,
        };
        return (
            <DonutWrapper>
                <svg height={this.props.radius * 2} width={this.props.radius * 2}>
                    <circle
                        style={style}
                        stroke={this.props.isError ? colors.error : colors.brandPrimary}
                        strokeWidth={this.props.stroke}
                        fill="transparent"
                        r={this.props.radius - this.props.stroke}
                        cx={this.props.radius}
                        cy={this.props.radius}
                    />
                </svg>
                {
                    this.props.progress > 0 && (
                        <DonutContent>
                            {
                                this.props.isSuccess && <Icon icon={icons.SUCCESS} color={colors.white} />
                            }
                            {
                                this.props.isError && <Icon icon={icons.ERROR} color={colors.error} />
                            }
                            {
                                !this.props.isError && !this.props.isSuccess && <div>{this.props.progress} %</div>
                            }
                        </DonutContent>
                    )
                }
            </DonutWrapper>

        );
    }
}

Donut.propTypes = {
    radius: PropTypes.number.isRequired,
    stroke: PropTypes.number.isRequired,
    progress(props, propName, componentName) {
        if (props[propName] < 0 || props[propName] > 100) {
            return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Should be a number between 0 (inc.) and 100 (inc.) Validation failed.`);
        }
        return null;
    },
    isError: PropTypes.bool,
    isSuccess: PropTypes.bool,
};

export default Donut;