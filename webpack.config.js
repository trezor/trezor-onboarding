const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin({ branch: true });

module.exports = env => ({
    entry: path.resolve(__dirname, 'src'),
    mode: 'development',
    output: {
        filename: '[git-revision-version]-[git-revision-branch]-app.js',
        path: path.resolve(__dirname, `dist/${env.BUILD}`),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },

    module: {
        rules: [
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitWarning: true,
                            cache: true,
                            eslint: {
                                configFile: path.join(__dirname, '.js.eslintrc'),
                            },
                        },

                    },
                    {
                        loader: 'stylelint-custom-processor-loader',
                        options: {
                            emitWarning: true,
                            configPath: '.stylelintrc',
                        },
                    },
                ],
            },
            {
                test: /\.(png|gif|jpg|mp4)$/,
                loader: 'file-loader?name=./images/[name].[ext]',
                query: {
                    outputPath: './images',
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                loader: 'file-loader',
                query: {
                    outputPath: './fonts',
                    name: '[name].[ext]',
                },
            },
            {
                type: 'javascript/auto',
                test: /\.json/,
                exclude: /(node_modules)/,
                loader: 'file-loader',
                query: {
                    outputPath: './data',
                    name: '[name].[ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: true,
            favicon: './favicon.ico',
        }),
        new UglifyJSPlugin(),
        gitRevisionPlugin,
        new DefinePlugin({
            VERSION: JSON.stringify(gitRevisionPlugin.version()),
            COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
            BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
            BUILD: JSON.stringify(env.BUILD),
            CONNECT: JSON.stringify(env.CONNECT),
        }),
        new CopyWebpackPlugin([
            { from: 'l10n', to: 'l10n' },
            { from: 'public/unsupported-browsers', to: 'unsupported-browsers' },
            { from: 'public/images', to: 'images' },
        ]),
        new Dotenv({
            path: `.env.${env.BUILD}`,
            safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            // silent: true, // hide any errors
            defaults: false, // load '.env.defaults' as the default values if empty.
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
    devServer: {
        https: true,
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
    // },
});