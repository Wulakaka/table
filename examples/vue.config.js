const path = require("path");
// const { UnusedFilesWebpackPlugin } = require("unused-files-webpack-plugin");
// const glob = require("glob-all");
const webpack = require("webpack");
// const PurgecssPlugin = require("purgecss-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    loaderOptions: {
      scss: {
        // additionalData: `@import "@/theme-chalk/tslbstb-variables.scss";`,
      },
    },
  },
  chainWebpack: (config) => {
    // 移除prefetch插件，避免加载多余的资源

    // config.plugins.delete("prefetch");
    // config.plugins.delete("preload");
    // config.optimization.minimize(true);
    // config.optimization.splitChunks({
    //   chunks: "all",
    // });

    config.plugin("html").tap((args) => {
      args[0].title = "特斯联UI组件库官方示例";
      return args;
    });
  },
  configureWebpack: (config) => {
    config.resolve.alias["@assets"] = resolve("./src/assets");
    config.resolve.alias["@"] = resolve("../packages");
    config.resolve.alias["@th"] = resolve("../packages/theme-chalk/packages");
    config.resolve.alias["@img"] = resolve("./src/assets/img/handsome.png");
    config.resolve.alias["@tm"] = resolve("../packages/theme-chalk/mixins");
    config.resolve.alias["@tslsmart/ui/lib"] = resolve("../lib");
    config.resolve.alias["@liang"] = resolve("../packages/tsl-table/imgs");
    config.resolve.alias["@var"] = resolve(
      "../packages/theme-chalk/tslbstb-variables.scss"
    );
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      })
    );
    // plugins.push(new UnusedFilesWebpackPlugin({
    //     globOptions: {
    //         ignore: ["node_modules/**/*", "dist/**/*", "yarn.lock", "vue.config.js", "README.md", "public/**/*", "babel.config.js", "package.json"]
    //     }
    // }))
    // plugins.push(new PurgecssPlugin({
    //     paths: glob.sync([path.join(__dirname, "./**/*.vue")]),
    //     extractors: [{
    //         extractor: (content) => {
    //             const validSection = content.replace(
    //                 /<style([\s\S]*?)<\/style>+/gim,
    //                 ""
    //             );
    //             return validSection.match(/[A-Za-z0-9-_:/]+/g) || [];
    //         },
    //         extensions: ["html", "vue"]
    //     }],
    //     // whitelist: ["html", "body"],
    //     // whitelistPatterns: [/el-.*/],
    //     safelist: [/^el-/],
    //     whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
    // }))

    // config.plugins = [...config.plugins, ...plugins]
  },
};
