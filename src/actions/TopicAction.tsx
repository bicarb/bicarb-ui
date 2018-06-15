/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getPostList } from '../api';
import { CLEAR_POSTS, FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS } from '../constants/ActionTypes';
import { Post, StoreState } from '../strore';
import { deserialize } from '../util/formatter';
import logger from '../util/logger';

export function requestPosts() {
  return {
    type: FETCH_POSTS_REQUEST as FETCH_POSTS_REQUEST,
  };
}
export type requestPosts = typeof requestPosts;

export function receivePosts(fetched: Post[], currentPage: number) {
  return {
    type: FETCH_POSTS_SUCCESS as FETCH_POSTS_SUCCESS,
    fetched,
    currentPage,
  };
}
export type receivePosts = typeof receivePosts;

export function clearPosts() {
  return {
    type: CLEAR_POSTS as CLEAR_POSTS,
  };
}
export type clearPosts = typeof clearPosts;

export const fetchPosts =
  (topicId: string, nextPage?: boolean): ThunkAction<void, StoreState, void, Action> =>
    (dispatch, getState) => {
      dispatch(requestPosts());
      const state = getState();
      const page = nextPage ? state.topicStore.currentPage + 1 : 1;
      
      getPostList(page, topicId)
          .then(response => response.json())
          .then(json => {
            const data = deserialize(json);
            logger.trace('After deserialize: ' + JSON.stringify(data, null, 2));
            dispatch(receivePosts(data, page));
          });
    };
