/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

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

  config.externals = {
    'highlight.js': 'hljs',

    'react': 'React',
    'react-dom': 'ReactDOM',
    'redux': 'Redux',
    'react-redux': 'ReactRedux',
    'redux-form': 'ReduxForm',
  }
};