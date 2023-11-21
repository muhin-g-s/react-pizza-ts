const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { InjectManifest } = require('workbox-webpack-plugin')

const MODE = process.env.NODE_ENV

const isDev = MODE === "development"
const isProd = !isDev

const swSrc = "./src-sw.ts"

const babelOptions = preset => {
    const opts = {
        presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
            "@babel/preset-modules"
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        Array.isArray(preset) ? opts.presets.concat(preset) : opts.presets.push(preset)
    }

    return opts
}

const plugins = () => {
    const base = [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                // {
                //     from: path.resolve(__dirname, 'src/assets/img/'),
                //     to: path.resolve(__dirname, 'assets'),
                // },
                {
                    from: path.resolve(__dirname, 'src/manifest.json'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ]

    if (isProd) {
        // base.push(new BundleAnalyzerPlugin())
        // base.push(new InjectManifest({
        //     swSrc,
        //     swDest: 'sw.js',
        // }));
    }

    return base
}


const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    }

    return config
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //     hmr: isDev,
            //     // reloadAll: "publicPath"
            // },
        },
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}


const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: MODE,
    entry: {
        main: ['@babel/polyfill', './index.tsx'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        // assetModuleFilename: '../assets/img/[name][ext]'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    devServer: {
        port: 3000,
        hot: isDev,
        historyApiFallback: true,
    },
    plugins: plugins(),
    optimization: optimization(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            // {
            //     test: /\.tsx$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: babelOptions('@babel/preset-typescript')
            //     }
            // }
            {
                test: /\.svg$/i,
                type: 'asset/resource',
                // use: ['@svgr/webpack'],
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions()
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions()
                }
            }
            // },
            // {
            //     test: /\.ts$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: "babel-loader",
            //         options: babelOptions("@babel/preset-typescript")
            //     }
            // }
        ]
    }
}