import styled from 'styled-components';

const StepWrapper = styled.div`

    @keyframes slide-in {
        0% {
            transform: translateX(100%);
            opacity: 0;
        }
        80% {
            opacity: 0
        }
        100% { 
            transform: translateX(0%);
            opacity: 1;
        }
    }
    
    @keyframes slide-out {
        0% {
            transform: translateX(0%);
            opacity: 1;
        }
        100% {
            transform: translateX(-100%); 
            opacity: 0;
        }
    }

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    margin-bottom: auto;
    width: 100%;
    /* transition: all 1s linear; */
    /* transform: translateX(0%); */

    /* opacity: 1; */
    /* animation: slide-in 1s; */
    /* animation: slide-out 1s */
`;

export default StepWrapper;