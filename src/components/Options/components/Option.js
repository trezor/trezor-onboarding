import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from 'config/colors';

const OptionWrapper = styled.div`
    flex-grow: 1;
    width: 100%;
    min-width: 120px;
    padding: 10px;
    margin: 5px;
    border: solid 1px ${colors.gray};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    /* todo: breakpoint as constant  */
   
    @media (min-width: 600px) {
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