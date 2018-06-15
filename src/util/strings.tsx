/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

export function stripHtml(s: string) {
  return s.replace(/<(?:.|\n)*?>/gm, '');
}
