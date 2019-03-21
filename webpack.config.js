const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const { DefinePlugin } = require('webpack');

const gitRevisionPlugin = new GitRevisionPlugin({ branch: true });
console.warn('proces.env', process.env.BUILD);
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
        }),
        new UglifyJSPlugin(),
        gitRevisionPlugin,
        new DefinePlugin({
            VERSION: JSON.stringify(gitRevisionPlugin.version()),
            COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
            BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
            BUILD: JSON.stringify(env.BUILD),
        }),
    ],

});