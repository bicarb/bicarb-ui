/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { _findLineEnd, _findLineStart } from '../../util/editorUtil';

it('findLineStart', () => {
  expect(_findLineStart('', 0)).toBe(0);
  expect(_findLineStart('1', 0)).toBe(0);
  expect(_findLineStart('1', 1)).toBe(0);
  expect(_findLineStart('1\n1', 1)).toBe(0);
  expect(_findLineStart('1\n1', 2)).toBe(2);
  expect(_findLineStart('1\n1', 3)).toBe(2);
});

it('findLineEnd', () => {
  expect(_findLineEnd('', 0)).toBe(0);
  expect(_findLineEnd('1', 0)).toBe(1);
  expect(_findLineEnd('1', 1)).toBe(1);
  expect(_findLineEnd('1\n1', 1)).toBe(1);
  expect(_findLineEnd('1\n1', 2)).toBe(3);
  expect(_findLineEnd('1\n1', 3)).toBe(3);
});