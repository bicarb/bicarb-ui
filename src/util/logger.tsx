/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import * as log from 'loglevel';

log.setLevel(log.levels.DEBUG, false);

(window as any).logger = log;

export default log;
