/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getSearchResult } from '../api';
import { FETCH_SEARCH_RESULT_REQUEST, FETCH_SEARCH_RESULT_SUCCESS } from '../constants/ActionTypes';
import { Post, StoreState } from '../strore';
import { deserialize } from '../util/formatter';
import logger from '../util/logger';

export function requestSearchResult(nextPage?: boolean) {
  return {
    type: FETCH_SEARCH_RESULT_REQUEST as FETCH_SEARCH_RESULT_REQUEST,
    nextPage,
  };
}
export type requestSearchResult = typeof requestSearchResult;

export function receiveSearchResult(fetched: Post[], totalRecords: number, currentPage: number) {
  return {
    type: FETCH_SEARCH_RESULT_SUCCESS as FETCH_SEARCH_RESULT_SUCCESS,
    fetched,
    totalRecords,
    currentPage,
  };
}
export type receiveSearchResult = typeof receiveSearchResult;

export const fetchSearchResult = 
  (q: string, nextPage?: boolean): ThunkAction<void, StoreState, void, Action> =>
    (dispatch, getState) => {
      dispatch(requestSearchResult(nextPage));
      const state = getState();
      const page = nextPage ? state.topicStore.currentPage + 1 : 1;
      
      getSearchResult(q, page)
          .then(res => res.json())
          .then(json => {
            const data = deserialize(json);
            logger.trace('After deserialize: ' + JSON.stringify(data, null, 2));
            dispatch(receiveSearchResult(data, json.meta.page.totalRecords, page));
          });
    };
