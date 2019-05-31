/*
    Declaration of global variables, typically provided by webpack
    It should be used minimally
*/
declare const BUILD: 'beta' | 'production' | 'development';
declare const CONNECT: string;

// todo typescript: is this ok? maybe not.
declare module '*.png' {
    const value: any;
    export = value;
}

declare module '*.svg' {
    const value: any;
    export = value;
}

declare module '*.gif' {
    const value: any;
    export = value;
}

declare module '*.mp4' {
    const value: any;
    export = value;
}

declare module '*.jpg' {
    const value: any;
    export = value;
}
