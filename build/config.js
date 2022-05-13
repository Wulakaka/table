var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var saladConfig = require('./salad.config.json');


var externals = {};

externals = [Object.assign({
  vue: 'vue',
}, externals), nodeExternals()];

exports.externals = externals;

exports.alias = {
  'main': path.resolve(__dirname, '../src'),
  'examples': path.resolve(__dirname, '../examples'),
  'vue$': 'vue/dist/vue.runtime.esm.js',
  '@': path.resolve(__dirname, '../packages')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date.\js/;

exports.postcss = function(webapck) {
  saladConfig.features.partialImport = {
    addDependencyTo: webapck
  };
  return [
    require('postcss-salad')(saladConfig)
  ];
};
