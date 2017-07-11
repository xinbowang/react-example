const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {dfPath, dfConfig } = require('./default.js');

let config = Object.assign(dfConfig, {

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            React: 'react',
            ReactDOM: 'react-dom',
            PT: 'prop-types'
        })
    ],

    resolve: {
    	extensions : ['.js','.css','.scss','.jsx'], // 自动补全后缀名
        modules: [
            'node_modules',
            dfPath.src,
            dfPath.common,
            dfPath.components,
            dfPath.layout,
            dfPath.view,
            dfPath.root
        ]
    },
    devtool: 'cheap-module-eval-source-map'

});


config.module.rules.push(
    // {
    //     test: /\.js$/,
    //     use: ['eslint-loader'],
    //     enforce: 'pre',
    //     include:[
    //         dfPath.src
    //     ]
    // },
    {
        test: /\.js$/,
        use: ['babel-loader'],
        include:[
            dfPath.src,
            dfPath.semantic
        ]
    },
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    },
    {
        test: /\.scss$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: { // css模块化
                    module: true,
                    localIdentName: '[local]--[hash:base64:6]' // 自动生成类名：base64方式 6位:[className]--3t75NQ
                }
            },
            {
                loader: 'sass-loader'
            }
        ]
    }
);

module.exports = config;
