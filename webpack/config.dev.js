import webpack from 'webpack';
import path from 'path';

export default {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  target: 'web',
  devServer: {
    contentBase: './src'
  },
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/client'
  ],
  output: {
    path: path.join(__dirname, '../dist-dev'),
    publicPath: '/',
    filename: 'client.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, '../src'),
        loader: 'babel'
      },
      {
        test: /\.json$/,
        include: path.join(__dirname, '../src'),
        loader: 'json'
      },
      {
        test: /(\.css)$/,
        loaders: ['style', 'css']
      },
      {
        test: /(\.styl)$/,
        loaders: ['style', 'css', 'stylus']
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?/,
        loader: 'url?prefix=font/&limit=5000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      }
    ]
  }
};
