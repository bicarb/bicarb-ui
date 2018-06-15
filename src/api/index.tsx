/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import {
  CONFIG_NOTIFICATIONS_SIZE,
  CONFIG_POSTS_SIZE,
  CONFIG_SEARCH_RESULT_SIZE,
  CONFIG_TOPICS_SIZE
} from '../constants/config';
import { defaultFetch, jsonApiGet, jsonApiPost } from './request';

const APPLICATION_FORM_URLENCODED = 'application/x-www-form-urlencoded';
const APPLICATION_JSON = 'application/json';

export function postLogin(usernameOrEmail: string, password: string, rememberMe?: boolean) {
  return defaultFetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': APPLICATION_FORM_URLENCODED,
    },
    body: `username=${usernameOrEmail}&password=${password}&remember-me=${!!rememberMe}`
  });
}

export function createUser(email: string,  username: string,  nickname: string,  password: string) {
  return jsonApiPost('/api/user', createJsonApiDocument('user', {
    email,
    username,
    nickname,
    password,
  }));
}

export function getUserByUsername(username: string) {
  return jsonApiGet(`/api/user/${username}`);
}

/**
 * getTopicList.
 * @param {number} page 1-based
 * @param {string} sort "+|-"? <PATH_TO_ATTRIBUTE>
 * @param {boolean} feature true or false
 * @param {string} categoryId topics under which category
 * @returns {Promise<Response>} Response
 */
export function getTopicList(page: number, sort: string, feature?: boolean, categoryId?: string) {
  // must exist
  const pageParam = `page[number]=${page}&page[size]=${CONFIG_TOPICS_SIZE}`;
  const sortParam = `sort=-pinned,${sort}`;
  const include = 'include=author,lastReplyBy';
  // may be empty
  const categoryFilter = `filter=categories.id==${categoryId ? categoryId : 0}`;
  const featureFilter = feature ? ';feature==true' : '';
  return jsonApiGet(`/api/topic?${categoryFilter}${featureFilter}&${sortParam}&${pageParam}&${include}`);
}

export function getPostList(page: number, topicId: string) {
  const pageParam = `page[number]=${page}&page[size]=${CONFIG_POSTS_SIZE}`;
  const sortParam = `sort=index`;
  const filterParam = `filter[post]=topic.id==${topicId}`;
  const include = 'include=author,topic';
  return jsonApiGet(`/api/post?${filterParam}&${sortParam}&${pageParam}&${include}`);
}

export function getNotifications(page: number) {
  const pageParam = `page[number]=${page}&page[size]=${CONFIG_NOTIFICATIONS_SIZE}`;
  const sortParam = `sort=-createAt`;
  const include = 'include=send,to,post,topic';
  return jsonApiGet(`/api/notification?${pageParam}&${sortParam}&${include}`);
}

export function postPreview(payload: {body: string, topicBody: boolean}) {
  return defaultFetch('/api/preview', {
    method: 'POST',
    headers: {
      'Content-Type': APPLICATION_JSON,
    },
    body: JSON.stringify(payload),
  });
}

export function postSendVerifyEmail() {
  return defaultFetch('/api/user/email/verify/send', {
    method: 'POST',
  });
}


export function postCreateTopic(categoryId: string, title: string, content: string) {
  return jsonApiPost("/api/topic", createJsonApiDocument('topic', {
    body: content,
    title,
  }, undefined, {
    categories: {
      data: [{
        id: String(categoryId),
        type: 'category',
      }]
    },
  }));
}

export function postCreatePost(topicId: string, content: string) {
  return jsonApiPost("/api/post", createJsonApiDocument('post', {
    raw: content,
  }, undefined, {
    topic: {
      data: {
        id: topicId,
        type: 'topic',
      }
    },
  }));
}

export function getSearchResult(q: string, page: number) {
  return defaultFetch(`/api/search?q=${q}&page=${page}&size=${CONFIG_SEARCH_RESULT_SIZE}`, {
    method: 'GET',
  });
}

// ---

function createJsonApiDocument(type: string, attributes: any, id?: string, relationships?: any) {
  const result: {
    data: {
      id?: string;
      type: string;
      attributes: any;
      relationships?: any;
    }
  } = {
    data: {
      type,
      attributes,
    }
  };

  if (id) {
    result.data.id = id;
  }

  if (relationships) {
    result.data.relationships = relationships;
  }

  return result;
}
