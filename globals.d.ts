/*
    Declaration of global variables, typically provided by webpack 
    It should be used minimally
*/

declare const BUILD: string;
declare const CONNECT: string;

// todo typescript: is this ok? maybe not.
interface window {
    __TREZOR_CONNECT_SRC: string;
}
