/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { receiveSearchResult, requestSearchResult } from '../actions/SearchResultActions';
import { FETCH_SEARCH_RESULT_REQUEST, FETCH_SEARCH_RESULT_SUCCESS } from '../constants/ActionTypes';
import { CONFIG_SEARCH_RESULT_SIZE } from '../constants/config';
import { SearchResultStore } from '../strore';

type SearchResultActions = ReturnType<requestSearchResult> | ReturnType<receiveSearchResult>;

const initial: SearchResultStore = {
  main: [],
  isFetching: false,
  hasMore: false,
  currentPage: 1,
  totalRecords: 0,
};

export function searchResultStore(state: SearchResultStore = initial, action: SearchResultActions) {
  switch (action.type) {
    case FETCH_SEARCH_RESULT_REQUEST:
      return {
        ...state,
        isFetching: true,
        totalRecords: 0,
        main: action.nextPage ? state.main : [],
      };
    case FETCH_SEARCH_RESULT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        totalRecords: action.totalRecords,
        currentPage: action.currentPage,
        hasMore: action.fetched.length === CONFIG_SEARCH_RESULT_SIZE,
        main: action.currentPage === 1 
          ? action.fetched 
          : [
            ...state.main,
            ...action.fetched,
          ],
      };
    default:
      return state;
  } 
}
