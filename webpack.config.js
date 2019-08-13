const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack");

const PATHS = {
    src: path.join(__dirname, 'src')
}

module.exports = {
    entry: path.join(__dirname, "src", "main.js"),
    output: {
        filename: "main_bundle.js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(svg|jpeg|jpg|gif)$/,
                exclude: /node_modules/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "assets"
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|png|ico)$/,
                loader: 'url-loader?limit=100000'
            },
            {

                test: /\.(sc|c)ss$/,
                exclude: /node_modules/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, "css-loader", "postcss-loader", "sass-loader", ]
            },
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new HtmlWebPackPlugin({
            template: "./src/html-template.html",
            filename: "./index.html"
        }),
        new ImageminPlugin({
            bail: false,
            cache: true,
            imageminOptions: {
                plugins: [
                    ["gifsicle", {
                        interlaced: true
                    }],
                    ["mozjpeg", {
                        quality: 70
                    }],
                    ["optipng", {
                        optimizationLevel: 5
                    }],
                    [
                        "svgo",
                        {
                            plugins: [{
                                removeViewBox: false
                            }]
                        }
                    ]
                ]
            }
        })

    ]
}