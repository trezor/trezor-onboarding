import styled from 'styled-components';

const StepWrapper = styled.div`
    display: grid;
    grid-template-areas: 
        'heading'
        'body';
    grid-template-rows: 80px 1fr;    
    grid-template-columns: 100%;
    transition: all 1s linear;
`;

export default StepWrapper;