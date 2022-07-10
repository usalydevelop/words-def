const path = require('path'); // import module from commonjs
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.[contenthash].js', // replace name from entry object above
        path: path.resolve(__dirname, './dist'),
        publicPath: '',
    },
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 3000, // around 3kb
        }
    },
    module: {
        rules: [
            {
                test: /\.(ttf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(png|jpeg|jpg)$/, // Detecta los archivos tipo imagen para procesarlos con el asset
                type: 'asset/resource',
                // type: 'asset/resource' // Genera el archivo en base64 en el mismo bundle
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
			filename: 'bundle.[contenthash].css'
		}),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*', // elimina todos los archivos y subcarpetas
                path.join(process.cwd(), 'build/**/*'),
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'Hello world',
            description: 'Hello world',
            favicon: path.resolve(__dirname, './logo-icon.png'),
        }),
    ]
}