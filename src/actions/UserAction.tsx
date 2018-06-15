/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getUserByUsername } from '../api';
import { CLEAR_USER, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from '../constants/ActionTypes';
import { StoreState, User } from '../strore';
import { deserialize } from '../util/formatter';
import logger from '../util/logger';

export function requestUser() {
  return {
    type: FETCH_USER_REQUEST as FETCH_USER_REQUEST,
  };
}
export type requestUser = typeof requestUser;

export function receiveUser(user: User) {
  return {
    type: FETCH_USER_SUCCESS as FETCH_USER_SUCCESS,
    user,
  };
}
export type receiveUser = typeof receiveUser;

export function clearUser() {
  return {
    type: CLEAR_USER as CLEAR_USER,
  };
}
export type clearUser = typeof clearUser;

export const fetchUser =
  (username: string): ThunkAction<void, StoreState, void, Action> =>
    (dispatch, getState) => {
      dispatch(requestUser());
      
      getUserByUsername(username)
          .then(res => res.json())
          .then(json => {
            const data = deserialize(json);
            logger.trace('After deserialize: ' + JSON.stringify(data, null, 2));
            dispatch(receiveUser(data));
          });
    };
