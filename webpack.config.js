const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const srcDir = 'src';
const stylesDir = 'styles';
const outputDir = 'dist';

module.exports = (env = "development") => {
    console.info(`####### build ${env} environment with Webpack #######`);

    const isProd = env === "production";

    const extractSass = new ExtractTextPlugin({
        filename: "[name].[contenthash].css",
        disable: !isProd
    });

    const config = {
        context: path.join(__dirname, srcDir),
        entry: {
            'main': './app/app.module',
            'vendor': [
                'angular',
                'angular-material'
            ],
            'styles': `${stylesDir}/main`
        },
        output: {
            path: path.join(__dirname, outputDir),
            filename: '[name].[chunkhash].bundle.js',
            sourceMapFilename: '[name].[chunkhash].map'
        },
        resolve: {
            extensions: ['.ts', '.js', '.html', '.scss', '.css'],
            modules: [
                path.join(__dirname, srcDir),
                'node_modules'
            ]
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ["env"]
                            }
                        },
                        {
                            loader: 'ts-loader'
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: extractSass.extract({
                        // use style-loader in development
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: true
                                }
                            },
                            {loader: 'resolve-url-loader'},
                            {
                                loader: "sass-loader",
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                }, {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {loader: 'resolve-url-loader'}
                        ]
                    })
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    test: /\.(ttf|eot|svg|woff(2)?|jpe?g|gif|png)$/,
                    loader: 'file-loader',
                    exclude: ['node_modules']
                }
            ]
        },
        plugins: [
            extractSass,
            new HtmlWebpackPlugin({
                template: 'index.html'
            }),
            new CopyWebpackPlugin([{
                from: 'assets',
                to: 'assets'
            }]),
            new CleanWebpackPlugin([outputDir], {
                verbose: true,
                dry: false
            }),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ]
    };

    if (env === 'development') {
        const devServer = {
            inline: true,
            port: 5000,
            contentBase: path.join(__dirname, srcDir),
            compress: true,
            watchOptions: {
                poll: 1000
            }
        };

        config.devtool = "source-map";
        config.devServer = devServer;
    }

    return config;
}
;