/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('react-scripts-ts/config/paths');

module.exports = function (config) {
  config.module.rules.unshift({
    test: /\.html$/,
    use: {
      loader: "html-loader",
      options: {
        attrs: false,
        minimize: false,
      },
    },
  });

  config.plugins[1] = new HtmlWebpackPlugin({
    inject: true,
    template: paths.appHtml,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: false,
      minifyCSS: true,
      minifyURLs: true,
    },
  });

  config.externals = {
    'highlight.js': 'hljs',

    'react': 'React',
    'react-dom': 'ReactDOM',
    'redux': 'Redux',
    'react-redux': 'ReactRedux',
    'redux-form': 'ReduxForm',
  }
};