const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.config.js');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(base, {
  entry: {
    client: './entry-client.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      files: {
        js: '/client.bundle.js',
      },
      filename: 'index.html',
    }),
    // new VueSSRClientPlugin(),
  ]
})
