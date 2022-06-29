module.exports = {
  outputDir: "lib",
  pages: {
    index: {
      entry: "examples/main.js",
      template: "examples/public/index.html",
      filename: "index.html",
    },
  },
  transpileDependencies: ["element-ui"],
};
