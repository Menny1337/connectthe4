const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
    return {
        entry: [
            'babel-polyfill',
            './index.ts',
            './index.scss'
        ],
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        plugins: [
            new webpack.DefinePlugin({
                API_URL: JSON.stringify(env.api_url),
                API_VERSION: "1.8",
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: path.resolve(__dirname, 'dist'),
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: [path.resolve(__dirname, 'components')],
                                sourceMap: true
                            }
                        },
                    ]
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-inline-loader'
                },
                {
                    test: /\.(jpg|jpeg|png)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            publicPath: './images/'
                        }
                    }]
                },
            ]
        }
    };
};
