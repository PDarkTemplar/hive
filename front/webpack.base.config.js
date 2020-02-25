import resolvePath from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import resolve from './webpack.resolve.config';

export default env => {
    const config = {
        output: {
            path: `${__dirname}/public/static/`,
            filename: '[name].bundle.js',
            chunkFilename: '[id].chunk.js',
            publicPath: `${process.env.HOST}/static/`,
        },
        optimization: {
            runtimeChunk: true,
            splitChunks: {
                cacheGroups: {
                    commons: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'initial' },
                },
            },
        },
        resolve,
        module: {
            rules: [
                {
                    test: /\.(woff|woff2|ttf|eot)(\?.*)?$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[hash:8].[ext]',
                        },
                    },
                },
                {
                    test: /\.(png|jpg|gif)?$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[name].[hash:8].[ext]',
                        },
                    },
                },
                {
                    test: /\.(svg)?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                        {
                            loader: 'react-svg-loader',
                            options: {
                                jsx: true,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: 'src/assets/icon.png', to: 'images/' },
                { from: 'src/manifest.json', to: './' },
            ]),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                },
                MQTT_PATH: JSON.stringify(process.env.MQTT_PATH),
                LOGIN_PATH: JSON.stringify(process.env.LOGIN_PATH),
            }),
            new HtmlWebpackPlugin({
                filename: '../index.html',
                template: './src/index.html',
            }),
        ],
    };

    if (env.visualize) {
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
            })
        );
    }

    if (env.c) {
        config.plugins.push(new CleanWebpackPlugin());
    }

    return config;
};
