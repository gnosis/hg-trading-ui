const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const DashboardPlugin = require('webpack-dashboard/plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');

const isProduction = process.env.NODE_ENV == 'production';
const baseUrl = isProduction && process.env.CI ? '/hg-trading-ui/' : '/';

module.exports = {
  devtool: 'eval-source-map',
  output: {
    path: `${__dirname}/docs`, // github pages for now,
    chunkFilename: isProduction ? '[name].[chunkhash:4].js' : '[name].js',
    filename: isProduction ? '[name].[chunkhash:4].js' : '[name].js',
    publicPath: baseUrl,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      }
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
    }),
    isProduction && new InlineChunkHtmlPlugin(HtmlWebPackPlugin, [/runtime/]),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      BASE_URL: baseUrl,
    }),
    new DashboardPlugin(),
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true,
  }
};
