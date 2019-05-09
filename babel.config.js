module.exports = (api) => {
    // api.cache.forever();

    const presets = [
        '@babel/typescript',
        '@babel/preset-env',
        '@babel/preset-react',
    ];

    const plugins = [
        'react-hot-loader/babel',
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
        // [
        //     '@babel/plugin-transform-runtime',
        //     {
        //         regenerator: true,
        //     },
        // ],
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

    const overrides = [
        {
            test: ['./src/**/*.ts'],
            presets: [
                '@babel/preset-typescript',
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            node: 'current',
                        },
                    },
                ],
                '@babel/preset-react',
            ],
        },
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
        overrides,
    };
};