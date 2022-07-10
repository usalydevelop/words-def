const path = require('path'); // import module from commonjs
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '',
    },
    mode: 'development',
    devServer: {
        port: 9000,
        static: { // Indicar cual van a ser los archivos a renderizar
            directory: path.resolve(__dirname, './dist') // Se utilia la misma que en el path del output
        },
        devMiddleware: {
            index: 'index.html', // Se define el index
            writeToDisk: true // Por defecto el server los almacena en memoria
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
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
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