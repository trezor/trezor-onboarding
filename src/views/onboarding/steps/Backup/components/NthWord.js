import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Word = styled.div`
    font-size: 3em;
`;

const NthWord = ({ number }) => {
    if (!number) {
        return null;
    }
    return (
        <Word>{number} word.</Word>
    );
};

NthWord.propTypes = {
    number: PropTypes.number, // todo: 1-24
};

export default NthWord;