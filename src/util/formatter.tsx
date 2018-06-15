/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import Jsona from 'jsona/lib/Jsona';

const dataFormatter = new Jsona();

/**
 * deserialize json api document
 * @param body json api document
 */
export function deserialize(body: any) {
  if (body.errors) {
    return body;
  } else {
    return dataFormatter.deserialize(body);
  }
}

(window as any).deserialize = deserialize;