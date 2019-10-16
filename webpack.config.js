const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';

const config = {
  // entry: path.join(__dirname, 'src/app.js'),
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: path.join(__dirname, '/dist')
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    },
    extensions: ['.vue', '.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader', // 处理.vue结尾的文件
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}
if(isDev){
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8005,
    host: '0.0.0.0',
    overlay: {
        errors: true // 将webpack编译的错误显示在网页上面
    },
    open: true // 在启用webpack-dev-server时，自动打开浏览器
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}
module.exports = config;