const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    // context: path.resolve(__dirname, 'src'),
    entry: {
        // 引入多支 JS
        index: './src/setting/js/index.js',
        product: './src/setting/js/product.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/',
        open: true,
        watchContentBase: true,
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outputStyle: 'compressed',
                            },
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'images/[name].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: process.env.NODE_ENV === 'production' ? false : true,
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].min.css"
        }),
        // 輸出多個html 
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: 'body',
            chunks: ['index', 'product'],
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'product.html',
            template: './src/product.html',
            inject: 'body',
            chunks: ['product'],
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
    ],
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src'),
            '@setting': path.resolve(__dirname, 'src/setting'),
            '@js': path.resolve(__dirname, 'src/js'),
            '@css': path.resolve(__dirname, 'src/css'),
            '@img': path.resolve(__dirname, 'src/images'),
        },
        extensions: ['.js', '.jsx']
    },
};

// 自動寫入多個頁面

// let htmlPageNames = ['example1', 'example2', 'example3', 'example4'];
// let multipleHtmlPlugins = htmlPageNames.map(name => {
//   return new HtmlWebpackPlugin({
//     template: `./src/${name}.html`, // relative path to the HTML files
//     filename: `${name}.html`, // output HTML files
//     chunks: [`${name}`] // respective JS files
//   })
// });

// plugins: [
//     new HtmlWebpackPlugin({
//       template: "./src/index.html",
//       chunks: ['main']
//     })
//   ].concat(multipleHtmlPlugins)

