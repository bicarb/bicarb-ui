/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */


import { clearUser, receiveUser, requestUser } from '../actions/UserAction';
import { CLEAR_USER, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from '../constants/ActionTypes';
import { UserStore } from '../strore';

type UserActions = ReturnType<requestUser> | ReturnType<receiveUser> | ReturnType<clearUser>;

const initial: UserStore = {
  isFetching: false,
};

export function userStore(state: UserStore = initial, action: UserActions) {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        main: action.user,
      };
    case CLEAR_USER:
      return {
        ...state,
        main: undefined,
      };
    default:
      return state;
  } 
}
