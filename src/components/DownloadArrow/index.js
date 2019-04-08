import styled from 'styled-components';

import colors from 'config/colors';

const DownloadArrow = styled.div`
    margin-left: 7px;
    border-radius: 100% 0 0;
    border-width: 2px 0 0 2px;
    border-style: solid;

    /* todo: color.brandPrimary (would need to color arrow as well). add constant  */
    /* border-color: ${colors.brandPrimary}; */

    border-color: #f00;
    height: 99%;

    ::after {
        bottom: 0;
        left: 1px;
        transform: rotate(180deg);
        position: absolute;
        background: url(images/arrowhead.svg) no-repeat 50%;
        content: "";
        width: 15px;
        height: 14px;
    }
`;

export default DownloadArrow;