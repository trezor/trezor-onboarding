import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as BREAKPOINT from 'config/breakpoints';

import Option from './Option';

const OptionsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: ${props => props.count * 200}px;

    @media (max-width: ${BREAKPOINT.SM}px) {
        flex-direction: column
    }
`;

const OptionsList = props => (
    <OptionsWrapper count={props.options.length}>
        {props.options.map(opt => (
            <Option
                onMouseEnter={() => (props.onMouseEnter ? props.onMouseEnter(opt[props.selectedAccessor]) : null)}
                onClick={opt.onClick ? opt.onClick : () => (props.onSelect(opt[props.selectedAccessor]))}
                key={opt.key}
                content={opt.content}
                isSelected={opt[props.selectedAccessor] === props.selected}

            />
        ))}
    </OptionsWrapper>
);

OptionsList.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.element,
        key: PropTypes.any, // todo: ?
        value: PropTypes.any,
        onClick: PropTypes.func,
    })),
    selected: PropTypes.any,
    selectedAccessor: PropTypes.string,
    onSelect: PropTypes.func,
    onMouseEnter: PropTypes.func,
};

export default OptionsList;