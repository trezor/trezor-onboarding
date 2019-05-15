/* eslint-disable no-undef */

const isBeta = (): boolean => BUILD === 'beta';

const isProduction = (): boolean => BUILD === 'production';

const isDevelopment = (): boolean => BUILD === 'development';

export {
    isBeta,
    isProduction,
    isDevelopment,
};