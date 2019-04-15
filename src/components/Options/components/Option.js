import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'config/colors';
import * as BREAKPOINTS from 'config/breakpoints';

const OptionWrapper = styled.div`
    flex-grow: 1;
    width: 100%;
    min-width: 120px;
    padding: 10px;
    margin: 5px;
    border: solid 0.2px ${colors.gray};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;    
    box-shadow: ${({ isSelected }) => (isSelected ? `0px 0px 2px 1px ${colors.brandPrimary}` : '0px 0px 6px 2px rgba(0,0,0,0.05)')};

    @media (min-width: ${BREAKPOINTS.SM}px) {
        height: 200px;    
    }
`;

const Circle = styled.div`
    background-color: ${colors.brandPrimary};
    border-radius: 50%;
    height: 20px;
    width: 20px;
    align-self: flex-end;
`;


const Option = props => (
    <OptionWrapper
        {...props}
        onClick={props.onClick}
        style={{
            borderColor: props.isSelected ? colors.brandPrimary : colors.gray,
            ...props.style,
        }}
    >
        <Circle style={{ visibility: props.isSelected ? 'visible' : 'hidden' }} />
        { props.content }
    </OptionWrapper>
);

Option.propTypes = {
    content: PropTypes.object, // todo probably required
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
    style: PropTypes.object,
};

export default Option;