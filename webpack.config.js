const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dev = process.env.NODE_ENV !== 'production';

const jsBundle = dev ? 'bundle.js' : 'bundle-[hash].js';
const cssBundle = dev ? 'styles.css' : 'styles-[hash].css';
const publicPath = 'http://localhost:9000/public/assets';

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER: JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new MiniCssExtractPlugin({
    filename: cssBundle
  }),
  new FriendlyErrorsWebpackPlugin(),
];

if (!dev) {
  plugins.push(new CleanWebpackPlugin({
      root: __dirname,
      verbose: true,
      dry: false
    })
  );
}

module.exports = {
  mode: dev ? 'development' : 'production',
  entry: {main: './src/client/index.js'},
  output: {
    path: path.join(__dirname, 'public/assets/'),
    filename: jsBundle,
    publicPath,
  },
  resolve: {
    modules: ["node_modules"],
    extensions: ['.js', '.jsx'],
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|public)/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: ['react-hot-loader/babel'],
          }
        }]
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(less)$/,
        use: [MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader",

          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|public)/,
        use: [{
          loader: 'eslint-loader',
          options: {
            emitWarning: true
          },
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
  devtool: dev ? 'none' : 'source-map',
  devServer: {
    headers: {'Access-Control-Allow-Origin': '*'},
    port: 9000,
  }
};