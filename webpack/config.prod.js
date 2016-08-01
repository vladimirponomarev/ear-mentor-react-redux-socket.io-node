import webpack from 'webpack';
import path from 'path';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};


export const server = {
  debug: false,
  target: 'node',
  node: {
    __dirname: false
  },
  entry: './tools/prod-server.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'server.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, '../tools/prod-server.js'),
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};

export const client = {
  debug: false,
  entry: './src/client.js',
  output: {
    path: path.join(__dirname, '../dist/base'),
    filename: 'client.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
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
