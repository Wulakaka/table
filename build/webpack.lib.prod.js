// 打包所有
// node.js里面自带的操作路径的模块
const path = require("path");
const webpackMerge = require("webpack-merge");
const webpackLibBaseConfig = require("./webpack.lib.base.js");
// 用于提取css到文件中
const miniCssExtractPlugin = require("mini-css-extract-plugin");
// 用于压缩css代码
const optimizeCssnanoPlugin = require("@intervolga/optimize-cssnano-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// 分析打包后模块分析插件
const webpackBundleAnalyzer =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const config = require("./config");

module.exports = webpackMerge.merge(webpackLibBaseConfig, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, //不将注释提取到单独的文件中
        // terserOptions: {
        //   // https://github.com/terser/terser#minify-options
        //   compress: {
        //     warnings: false, // 删除无用代码时是否给出警告
        //     drop_debugger: true, // 删除所有的debugger
        //     drop_console: true, // 删除所有的console.*
        //     pure_funcs: ["console.log"],
        //   },
        // },
      }),
    ],
  },
  // devtool: "",
  entry: {
    tslbstb: path.resolve(__dirname, "../src/index.js"),
  },
  output: {
    // 打包过后的文件的输出的路径
    path: path.resolve(__dirname, "../lib"),
    // 打包后生成的js文件
    filename: "[name].js",
    publicPath: "/",
    library: "tslbstb",
    libraryTarget: "umd",
    libraryExport: "default",
    umdNamedDefine: true,
    chunkFilename: "[id].js",
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: config.alias,
    modules: ["node_modules"],
  },
  externals: config.externals,
  module: {},
  plugins: [
    // 新建miniCssExtractPlugin实例并配置
    new miniCssExtractPlugin({
      filename: "[name].css",
    }),
    // 压缩css
    new optimizeCssnanoPlugin({
      sourceMap: true,
      cssnanoOptions: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      },
    }),

    // 暂时注释掉，不需要每次打包都分析
    // new webpackBundleAnalyzer({
    //   analyzerMode: "static",
    // }),

    // new ParallelUglifyPlugin({
    //   // 传递给 UglifyJS 的参数
    //   // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
    //   uglifyJS: {
    //     output: {
    //       beautify: false, // 最紧凑的输出
    //       comments: false, // 删除所有的注释
    //     },
    //     compress: {
    //       // 删除所有的 `console` 语句，可以兼容 IE 浏览器
    //       drop_console: true,
    //     }
    //   }
    // })
  ],
});
