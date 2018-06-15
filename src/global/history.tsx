/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import createHistory from 'history/createBrowserHistory';

const history = createHistory();

history.listen((location) => {
  const ga = (window as any).ga;
  if (ga) {
    ga('set', 'page', location.pathname + location.search);
    ga('send', 'pageview');
  }
});

export default history;