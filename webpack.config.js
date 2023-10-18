const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[contenthash].js',
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'src'),
            watch: true,
          },
        port: 8080,
        open: true,
        compress: true,
        hot: true,
    },
    optimization: {
        minimizer: [
            '...',
            new CssMinimizerWebpackPlugin()
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[contenthash].css'
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { 
        //             from: path.resolve(__dirname, 'src/assets/icons/play.svg'),
        //             to: path.resolve(__dirname, 'dist') 
        //         },
        //     ],
        // })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, 
                    'css-loader'
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    }, 
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|mp3)$/i,
                type: 'asset/resource',
            },
        ]
    },
}