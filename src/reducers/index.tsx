/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { routerReducer } from 'react-router-redux';
import { AnyAction, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { StoreState } from '../strore';
import { notificationsStore } from './notifications';
import { searchResultStore } from './searchResult';
import { topicStore } from './topic';
import { topicsStore } from './topics';
import { userStore } from './user';

const reducer = combineReducers<StoreState, AnyAction>({
  form: reduxFormReducer,
  router: routerReducer,
  userStore,
  topicsStore,
  topicStore,
  notificationsStore,
  searchResultStore,
} as any); // TODO remove any

export default reducer;