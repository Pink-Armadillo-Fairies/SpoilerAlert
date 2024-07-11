const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        src: './client/main.js',  
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, 
                exclude: /node_modules/,
                loader: 'babel-loader', 
                options: {
                    presets: ['@babel/env', '@babel/react'],  
                },
            },
            {
                test: /\.s?css$/,  
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'index.html',
        })
    ],
    devServer: {
        static: {
            publicPath: '/build/',
            directory: path.resolve(__dirname, 'build'),
        },
        port: 8080,
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:3000',
            },
        ],
    },
};