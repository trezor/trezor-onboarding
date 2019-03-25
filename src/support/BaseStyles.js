import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const baseStyles = createGlobalStyle`
    ${reset}
    html, body {
        width: 100%;
        height: 100%;
        position: relative;
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        ${'' /* font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
        line-height: calc(1.3em + (1.5 - 1.2) * ((100vw - 300px)/(1600 - 300))); */}
    }

    * , *:before , *:after {
        box-sizing: border-box;
    }

    * {
        margin: 0;
        padding: 0;
    }

    *::selection, *::-moz-selection, *:focus, *:active, *:active:focus,  {
        outline: 0 !important;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }

    a:focus,
    button:focus,
    input:focus,
    textarea:focus {
        outline: 0;
    }

    /* classes required by react transitions https://github.com/reactjs/react-transition-group */
    .example-enter {
        opacity: 0.01;
    }

    .example-enter.example-enter-active {
        opacity: 1;
        transition: opacity 300ms ease-in;
    }
`;

export default baseStyles;
