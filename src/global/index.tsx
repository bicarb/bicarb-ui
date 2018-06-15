/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { Category, Group, User } from '../strore';

/**
 * read from <meta> or global variable, should not change unless refresh page
 */
interface G {
  readonly settings: Map<string, string>;
  readonly categories: Category[];
  readonly categorySlugToId: Map<string, string>;
  readonly groups: Group[];
  readonly auth?: User;
  readonly csrf: string;
  readonly csrfHeader: string;
  readonly csrfParameter: string;
  readonly ios: boolean;
}

function convertObjectToMap(obj: object) {
  const map = new Map();
  Object.keys(obj).forEach(key => {
    map.set(key, obj[key]);
  });
  return map;
}

const csrfMeta = document.querySelector('meta[name="_csrf"]');
const csrf = csrfMeta
  ? csrfMeta.getAttribute('content') as string
  : '';

const csrfHeaderMeta = document.querySelector('meta[name="_csrf_header"]');
const csrfHeader = csrfHeaderMeta
  ? csrfHeaderMeta.getAttribute('content') as string
  : 'csrfHeaderNotFound';

const csrfParameterMeta = document.querySelector('meta[name="_csrf_parameter"]');
const csrfParameter = csrfParameterMeta
  ? csrfParameterMeta.getAttribute('content') as string
  : 'csrfNotFound';

const settings = (window as any).settings ? convertObjectToMap((window as any).settings) : new Map();
const groups = (window as any).groups ? (window as any).groups : [];
const categories = (window as any).categories ? (window as any).categories : [];
const auth = (window as any).auth;

const categorySlugToId: Map<string, string> =
  categories ? new Map(categories.map((c: Category) => [c.slug, String(c.id)])) : new Map();

const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);

const G: G = {
  settings,
  groups,
  categories,
  categorySlugToId,
  auth,
  csrf,
  csrfHeader,
  csrfParameter,
  ios,
};

export default G;