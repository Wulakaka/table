// babel.config.js
module.exports = {
  // 配置预置环境
  presets: [
    // 使用的规则
    ["@babel/preset-env"],
    "@vue/cli-plugin-babel/preset",
    [
      "@vue/babel-preset-jsx",
      {
        injectH: false,
      },
    ],
  ],
  plugins: [
    ["@babel/plugin-transform-arrow-functions"],
    ["@babel/plugin-transform-runtime", {}],
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ],
};
