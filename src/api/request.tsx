/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import G from '../global';

const JSON_API_CONTENT_TYPE = 'application/vnd.api+json';

/**
 * Set default same-origin, and csrf header.
 */
export function defaultFetch(url: string, init: RequestInit) {
  return fetch(url, {
    mode: 'same-origin',
    credentials: 'same-origin',
    ...init,
    headers: {
      [G.csrfHeader]: G.csrf,
      ...init.headers,
    },
  });
}

/**
 * JSON API get.
 */
export function jsonApiGet(url: string) {
  return defaultFetch(url, {
    method: 'GET',
    headers: {
      'Accept': JSON_API_CONTENT_TYPE,
    },
  });
}

/**
 * JSON API post.
 * @param {string} url url
 * @param body valid json api document
 * @returns {Promise<Response>}
 */
export function jsonApiPost(url: string, body: any) {
  return defaultFetch(url, {
    method: 'POST',
    headers: {
      'Accept': JSON_API_CONTENT_TYPE,
      'Content-Type': JSON_API_CONTENT_TYPE,
    },
    body: JSON.stringify(body),
  });
}

/**
 * JSON API patch.
 * @param {string} url url
 * @param body valid json api document
 * @returns {Promise<Response>}
 */
export function jsonApiPatch(url: string, body: any) {
  return defaultFetch(url, {
    method: 'PATCH',
    headers: {
      'Accept': JSON_API_CONTENT_TYPE,
      'Content-Type': JSON_API_CONTENT_TYPE,
    },
    body: JSON.stringify(body),
  });
}

/**
 * JSON API delete.
 */
export function jsonApiDeleteEntity(url: string) {
  return defaultFetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': JSON_API_CONTENT_TYPE,
    },
  });
}
