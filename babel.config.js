module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
    ],
    plugins: [
        'react-hot-loader/babel',
        '@babel/plugin-proposal-class-properties',
        ['module-resolver', {
            root: ['./src'],
        }],
    ],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-runtime'],
        },
    },

};