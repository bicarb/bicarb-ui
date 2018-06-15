/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

const commonStyles = {
  stickAfterAppBar: {
    position: 'sticky' as 'sticky',
    // zIndex: theme.zIndex.appBar,
    top: 56,
    '@media (min-width:0px) and (orientation: landscape)': {
      top: 48,
    },
    '@media (min-width:600px)': {
      top: 64,
    },
  },
};

export default commonStyles;