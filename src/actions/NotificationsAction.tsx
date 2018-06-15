/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getNotifications } from '../api';
import { FETCH_NOTIFICATIONS_REQUEST, FETCH_NOTIFICATIONS_SUCCESS } from '../constants/ActionTypes';
import { StoreState } from '../strore';
import { deserialize } from '../util/formatter';
import logger from '../util/logger';

export function requestNotifications() {
  return {
    type: FETCH_NOTIFICATIONS_REQUEST as FETCH_NOTIFICATIONS_REQUEST,
  };
}
export type requestNotifications = typeof requestNotifications;

export function receiveNotifications(fetched: Notification[], currentPage: number) {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS as FETCH_NOTIFICATIONS_SUCCESS,
    fetched,
    currentPage,
  };
}
export type receiveNotifications = typeof receiveNotifications;


export const fetchNotifications = 
  (nextPage?: boolean): ThunkAction<void, StoreState, void, Action> =>
    (dispatch, getState) => {
      dispatch(requestNotifications());
      const state = getState();
      const page = nextPage ? state.notificationsStore.currentPage + 1 : 1;

      getNotifications(page)
          .then(res => res.json())
          .then(json => {
            const data = deserialize(json);
            logger.trace('After deserialize: ' + JSON.stringify(data, null, 2));
            dispatch(receiveNotifications(data, page));
          });
    };
