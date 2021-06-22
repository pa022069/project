// Setting
/**
* Represents a book.
* @name: "頁面名稱"
* @function: "使用到的 js"
*/

const page = [
  {
    name: "index",
    function: ["index", "product"]
  }, {
    name: "product",
    function: ["product"]
  }
];

// Constructor
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = page.reduce(function (o, val) { o[val.name] = `src/setting/${val.name}.js`; return o; }, {});

const createPages = page.map((item) =>
  new HtmlWebpackPlugin({
    filename: `${item.name}.html`,
    template: `./src/${item.name}.html`,
    inject: 'body',
    chunks: item.function,
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  })
);

module.exports = {
  mode: process.env.NODE_ENV,
  // context: path.resolve(__dirname, 'src'),
  entry,
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
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/"
            }
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
    ...createPages
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