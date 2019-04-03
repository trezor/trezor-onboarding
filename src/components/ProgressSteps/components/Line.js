import styled from 'styled-components';
import colors from 'config/colors';

const Line = styled.div`
    flex-grow: 1;
    height: 1.3px;
    visibility: ${({ isFirst, isLast }) => ((isFirst || isLast) ? 'hidden' : 'visible')};
    align-self: center;
    transition: all ${props => (props.transitionDuration)}s linear;
    transition-delay: ${props => (props.transitionDuration * props.order)}s;
    background: linear-gradient(to right, ${colors.brandPrimary} 50%, ${colors.gray} 50%);
    background-size: 200% 100%;
    background-position: ${props => (props.isActive ? 'right bottom' : 'left bottom')};
`;

export default Line;