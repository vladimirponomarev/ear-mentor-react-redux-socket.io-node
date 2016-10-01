import webpack from 'webpack';
import path from 'path';

export default {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  entry: [
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './src/client.jsx'
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
        test: /\.jsx?$/,
        include: path.join(__dirname, '../src'),
        loaders: ['babel']
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
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      }
    ]
  }
};
