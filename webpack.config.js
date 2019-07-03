const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV == 'production';
const baseUrl = isProduction ? '/hg-trading-ui/' : '/';

if (isProduction) {
  console.log('Running in production environment');
}

module.exports = {
  devtool: 'eval-source-map',
  output: {
    path: `${__dirname}/docs`, // github pages for now
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    modules: [
      'node_modules',
      'src',
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/html/index.html',
      base: baseUrl,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      BASE_URL: baseUrl,
    }),
  ],
};
