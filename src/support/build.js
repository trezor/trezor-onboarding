// eslint-disable-next-line no-undef
const build = BUILD;

const isBeta = () => build === 'beta';

const isProduction = () => build === 'production';

const isDevelopment = () => build === 'development';

export {
    isBeta,
    isProduction,
    isDevelopment,
};