const merge = require('webpack-merge');
const base = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
  target: 'node',
  entry: {
    server: './entry-server.js',
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.ssr.html',
      filename: 'index.ssr.html',
      files: {
        js: '/client.bundle.js',
      },
      excludeChunks: ['server']
    }),
    // new VueSSRServerPlugin(),
  ]
})