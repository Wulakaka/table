// 库打包的主要配置
// 引入vue-loader插件
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// 引入清除打包后文件的插件（最新版的需要解构，不然会报不是构造函数的错，而且名字必须写CleanWebpackPlugin）
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const config = require("./config");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  // 我们打包组件库时不需要把Vue打包进去
  externals: {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue",
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6|es7)$/,
        exclude: config.jsexclude,
        include: process.cwd(),
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[local]_[hash:base64:8]',
                  },
                },
              },
              'postcss-loader',
              {
                loader: "sass-loader",
                options: {
                  implementation: require("dart-sass"),
                  // prependData: `@import "@/theme-chalk/tslbstb-variables.scss";`,
                },
              },
            ],
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              {
                loader: "sass-loader",
                options: {
                  implementation: require("dart-sass"),
                  // prependData: `@import "@/theme-chalk/tslbstb-variables.scss";`,
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'img/[name].[hash:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100000,
              // name: path.posix.join('static', '[name].[hash:7].[ext]')
              name: "fonts/[name].[hash:7].[ext]",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader?minimize=false",
          },
        ],
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
};
