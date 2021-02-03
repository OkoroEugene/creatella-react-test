const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = {
    mode: 'development',
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html")
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed) // it will automatically pick up key values from .env file
        })
    ],
    entry: {
        main: path.resolve(__dirname, "src", "index.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|gif|otf|ttf)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            }
        ]
    },
    devServer: {
        contentBase: './public',
        // port: 3000,
        historyApiFallback: true
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    // resolve: {
    //     // ... rest of the resolve config
    //     fallback: {
    //         "path": false,
    //         "buffer": false,
    //         "crypto": false,
    //         "https": false,
    //         "http": false,
    //         "vm": false,
    //         "os": false,
    //         "assert": false,
    //         "tty": false
    //     }
    // },
};