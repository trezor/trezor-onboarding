import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as BREAKPOINT from 'config/breakpoints';

import Option from './Option';

const OptionsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    width: 100%;

    @media (min-width: ${BREAKPOINT.SM}px) {
        width: ${(props) => props.count * 200 };
        max-width: 130%;
        flex-direction: row;
    }
`;

const OptionsList = ({ selectedAccessor = 'value', ...props }) => (
    <OptionsWrapper count={props.options.length}>
        {props.options.map(opt => (
            <Option
                onClick={opt.onClick ? opt.onClick : () => (props.onSelect(opt[selectedAccessor]))}
                key={opt.key}
                content={opt.content}
                isSelected={opt[selectedAccessor] === props.selected}
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
};

export default OptionsList;