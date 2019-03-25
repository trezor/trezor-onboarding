import styled from 'styled-components';

const ControlsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
    & > * {
        margin: 3px 10px 3px 10px;
    }

    /* todo: breakpoint as constant */

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

export default ControlsWrapper;
