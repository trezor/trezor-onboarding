// module.exports = {
//     presets: [
//         '@babel/preset-env',
//         '@babel/preset-react',
//     ],
//     plugins: [
//         'react-hot-loader/babel',
//         '@babel/plugin-proposal-class-properties',
//         ['module-resolver', {
//             root: ['./src'],
//         }],
//     ],
//     env: {
//         test: {
//             plugins: ['@babel/plugin-transform-runtime'],
//         },
//     },

// };

module.exports = (api) => {
    // api.cache.forever();

    const presets = [
        '@babel/preset-env',
        '@babel/preset-react',
    ];

    const plugins = [
        'react-hot-loader/babel',
        // '@babel/plugin-transform-flow-strip-types',
        '@babel/plugin-proposal-class-properties',
        // '@babel/plugin-proposal-object-rest-spread',
        [
            '@babel/plugin-transform-runtime',
            {
                regenerator: true,
            },
        ],
        [
            'module-resolver',
            {
                root: [
                    './src',
                ],
                alias: {
                    public: [
                        './public',
                    ],
                },
            },
        ],
        // 'babel-plugin-styled-components',
    ];

    // if (api.env('test')) {
    //     presets.push('jest');
    // }

    if (api.env('translations')) {
        plugins.push(
            [
                'react-intl',
                {
                    messagesDir: './translations/extractedMessages/',
                    extractSourceLocation: true,
                },
            ],
        );
    }

    return {
        presets,
        plugins,
    };
};