const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');

const gitRevisionPlugin = new GitRevisionPlugin({ branch: true });

module.exports = env => ({
    entry: ['@babel/polyfill', './src/index.js'],
    mode: 'development',
    output: {
        filename: '[git-revision-version]-[git-revision-branch]-app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitWarning: true,
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
    ],

});