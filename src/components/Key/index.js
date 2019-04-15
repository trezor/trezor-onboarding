import React from 'react';
import Proptypes from 'prop-types';
import styled from 'styled-components';

const KeyInside = styled.div`
    display: inline-block;
    padding: ${props => (props.isPressed ? '4px 10px' : '6px 10px')}; 
    font-size: 13px;
    line-height: 10px;
    color: #444d56;
    vertical-align: middle;
    background-color: #fafbfc;
    border: solid 1px #c6cbd1;
    border-bottom-color: #959da5;
    border-radius: 3px;
    box-shadow: inset 0 -3px 0 #959da5;
    box-shadow: ${props => (props.isPressed ? 'inset 0 -1px 0 #959da5' : 'inset 0 -3px 0 #959da5')}; 
    margin-top: auto;
`;

const KeySlot = styled.div`
    height: 30px;
    display: flex;
`;

const Key = ({ text, isPressed }) => (
    <KeySlot>
        <KeyInside isPressed={isPressed}>{text}</KeyInside>
    </KeySlot>
);

Key.propTypes = {
    text: Proptypes.string.isRequired,
    isPressed: Proptypes.bool.isRequired,
};

export default Key;
