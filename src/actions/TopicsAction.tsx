/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getTopicList } from '../api';
import { FETCH_TOPICS_REQUEST, FETCH_TOPICS_SUCCESS, ON_TOPICS_TAB_CHANGE } from '../constants/ActionTypes';
import G from '../global';
import { StoreState, Topic } from '../strore';
import { deserialize } from '../util/formatter';
import logger from '../util/logger';

export function onTopicsTabChange(index: number) {
  return {
    type: ON_TOPICS_TAB_CHANGE as ON_TOPICS_TAB_CHANGE,
    index,
  };
}
export type onTopicsTabChange = typeof onTopicsTabChange;

export function requestTopics(nextPage?: boolean) {
  return {
    type: FETCH_TOPICS_REQUEST as FETCH_TOPICS_REQUEST,
    nextPage,
  };
}
export type requestTopics = typeof requestTopics;

export function receiveTopics(fetched: Topic[], currentPage: number) {
  return {
    type: FETCH_TOPICS_SUCCESS as FETCH_TOPICS_SUCCESS,
    fetched,
    currentPage,
  };
}
export type receiveTopics = typeof receiveTopics;

export const fetchTopics =
  (nextPage?: boolean): ThunkAction<void, StoreState, void, Action> =>
    (dispatch, getState) => {
      dispatch(requestTopics(nextPage));
      const state = getState();
      const tabIndex = state.topicsStore.tabIndex;
      const page = nextPage ? state.topicsStore.currentPage + 1 : 1;
      const sortBy = tabIndex === 0
        ? '-lastReplyAt'
        : (tabIndex === 1
          ? '-createAt'
          : '-postIndex');

      const location = state.router.location;
      const feature = location ? location.pathname === '/feature' : undefined;

      let categoryId;
      if (location) {
        const matcher = location.pathname.match(`^/category/([A-Za-z0-9_-]+)[?/]?.*$`);
        if (matcher) {
          categoryId = G.categorySlugToId.get(matcher.pop() as string);
        }
      }

      getTopicList(page, sortBy, feature, categoryId)
          .then(response => response.json())
          .then(json => {
            const data = deserialize(json);
            logger.trace('After deserialize: ' + JSON.stringify(data, null, 2));
            dispatch(receiveTopics(data, page));
          });
    };
export type fetchTopics = typeof fetchTopics;

export const fetchTopicsForNewTab =
  (tabIndex: number): ThunkAction<void, StoreState, void, Action> =>
    (dispatch, getState) => {
      dispatch(onTopicsTabChange(tabIndex));
      dispatch(fetchTopics());
    };
export type fetchTopicsForNewTab = typeof fetchTopicsForNewTab;