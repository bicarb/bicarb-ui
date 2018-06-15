/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import * as Cookies from 'js-cookie';
import { C_LOCALE } from '../constants/cookie';
import en from './en';

// tslint:disable-next-line:prefer-const
let T = en;

const langSet = new Set([
  'en',
  'zh-CN',
]);

export function loadTranslation () {
  let locale = Cookies.get(C_LOCALE);
  if (locale === undefined) {
    for (const lang of [navigator.language, ...navigator.languages]) {
      if (lang === 'en') { break; }
      if (langSet.has(lang)) {
        locale = lang;
        Cookies.set(C_LOCALE, locale, { expires: 365 });
        break;
      }
    }
  }
  if (locale !== undefined) {
    return import(`./${locale}`);
  } else {
    return Promise.resolve();
  }
}

export default T;
export { langSet };