/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { clearPosts, receivePosts, requestPosts } from '../actions/TopicAction';
import { CLEAR_POSTS, FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS } from '../constants/ActionTypes';
import { CONFIG_POSTS_SIZE} from '../constants/config';
import { TopicStore } from '../strore';

type TopicActions = ReturnType<requestPosts> | ReturnType<receivePosts> | ReturnType<clearPosts>;

const initial: TopicStore = {
  main: [],
  isFetching: false,
  hasMore: false,
  currentPage: 1,
};

export function topicStore(state: TopicStore = initial, action: TopicActions): TopicStore {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentPage: action.currentPage,
        hasMore: action.fetched.length === CONFIG_POSTS_SIZE,
        main: action.currentPage === 1 
          ? action.fetched 
          : [
            ...state.main,
            ...action.fetched,
          ],
      };
    case CLEAR_POSTS:
      return {
        ...state,
        main: [],
        hasMore: false,
      };
    default:
      return state;
  }
}