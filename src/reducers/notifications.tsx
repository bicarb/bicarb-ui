/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { receiveNotifications, requestNotifications } from '../actions/NotificationsAction';
import { FETCH_NOTIFICATIONS_REQUEST, FETCH_NOTIFICATIONS_SUCCESS } from '../constants/ActionTypes';
import { CONFIG_NOTIFICATIONS_SIZE } from '../constants/config';
import { NotificationsStore } from '../strore';

type NotificationsActions = ReturnType<requestNotifications> | ReturnType<receiveNotifications>;

const initial: NotificationsStore = {
  main: [],
  isFetching: false,
  hasMore: false,
  currentPage: 1,
};

export function notificationsStore(state: NotificationsStore = initial, action: NotificationsActions) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentPage: action.currentPage,
        hasMore: action.fetched.length === CONFIG_NOTIFICATIONS_SIZE,
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
