/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { onTopicsTabChange, receiveTopics, requestTopics } from '../actions/TopicsAction';
import { FETCH_TOPICS_REQUEST, FETCH_TOPICS_SUCCESS, ON_TOPICS_TAB_CHANGE } from '../constants/ActionTypes';
import { CONFIG_TOPICS_SIZE } from '../constants/config';
import { TopicsStore } from '../strore';

type TopicsActions = ReturnType<requestTopics> | ReturnType<receiveTopics> | ReturnType<onTopicsTabChange>;

const initial: TopicsStore = {
  main: [],
  tabIndex: 0,
  isFetching: false,
  hasMore: false,
  currentPage: 1,
};

export function topicsStore(state: TopicsStore = initial, action: TopicsActions): TopicsStore {
  switch (action.type) {
    case FETCH_TOPICS_REQUEST:
      return {
        ...state,
        isFetching: true,
        main: action.nextPage ? state.main : [],
      };
    case FETCH_TOPICS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentPage: action.currentPage,
        hasMore: action.fetched.length === CONFIG_TOPICS_SIZE,
        main: action.currentPage === 1
          ? action.fetched
          : [
            ...state.main,
            ...action.fetched,
          ],
      };
    case ON_TOPICS_TAB_CHANGE:
      return {
        ...state,
        tabIndex: action.index,
      };
    default:
      return state;
  }
}