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
    .step-transition-enter {
        opacity: 0;
        transform: translateX(+100%);
        position: absolute;
    }

    .step-transition-enter-active {
        opacity: 1;
        transform: translateX(0);
        transition: opacity 400ms ease-in, transform 400ms ease-out;
    }

    .step-transition-exit {
        opacity: 1;
        transform: translateX(0);
    }

    .step-transition-exit-active {
        opacity: 0;
        transform: translateX(-100%);
        transition: opacity 400ms ease-out, transform 400ms ease-in;
    }
`;

export default baseStyles;
