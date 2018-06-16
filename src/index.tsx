/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import 'highlight.js/styles/github.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import G from './global';
import { default as T, loadTranslation } from './i18n';
import store from './strore';

const theme = createMuiTheme();

loadTranslation().then(value => {
  if (value !== undefined) { Object.assign(T, ...value.default); }
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement
  );
}).then(() => (window as any).G = G);
