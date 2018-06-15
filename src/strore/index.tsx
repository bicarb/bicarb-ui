/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { routerMiddleware, RouterState } from 'react-router-redux';
import { AnyAction, applyMiddleware, compose, createStore } from 'redux';
import { FormState } from 'redux-form';
import thunk from 'redux-thunk';
import history from '../global/history';
import reducer from '../reducers';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore<StoreState, AnyAction, {}, {form: FormState}>(
  reducer,
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
);
export default store;

export interface StoreState {
  // readonly form: FormState; // Do not direct use...
  readonly router: RouterState;
  readonly userStore: UserStore;
  readonly topicsStore: TopicsStore;
  readonly topicStore: TopicStore;
  readonly notificationsStore: NotificationsStore;
  readonly searchResultStore: SearchResultStore;

  // setting
  // readonly theme: 'light' | 'dark';
}

export interface UserStore {
  readonly main?: User;
  readonly isFetching: boolean;
}

export interface TopicsStore {
  readonly main: Topic[];
  readonly tabIndex: number;
  readonly isFetching: boolean;
  readonly hasMore: boolean;
  readonly currentPage: number;  // next page : +1
}

export interface TopicStore {
  readonly main: Post[];
  readonly isFetching: boolean;
  readonly hasMore: boolean;
  readonly currentPage: number;  // next page : +1
}

export interface NotificationsStore {
  readonly main: Notification[];
  readonly isFetching: boolean;
  readonly hasMore: boolean;
  readonly currentPage: number;  // next page : +1
}

export interface SearchResultStore {
  readonly main: Post[];
  readonly isFetching: boolean;
  readonly hasMore: boolean;
  readonly currentPage: number;  // next page : +1
  readonly totalRecords: number;
}

/*
 * Entity Define.
 */

export interface User {
  readonly id: string;
  readonly username: string;
  readonly nickname: string;
  readonly password?: string;
  readonly email?: string;
  readonly emailPublic: boolean;
  readonly avatar: string;
  readonly bio: string;
  readonly website: string;
  readonly github: string;
  readonly topicCount: number;
  readonly postCount: number;
  readonly active: boolean;
  readonly lockedAt: string;
  readonly lockedUntil: string;
  readonly lastSignInAt: string;
  readonly lastSignIp?: string;
  readonly createAt: string;
  readonly group: Group;
}

export interface Group {
  readonly id: string;
  readonly name: string;
  readonly color: string;
  readonly icon: string;
  readonly permissions: Set<string>;
}

export interface Category {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly topicCount: number;
  readonly position: number;
  readonly parent: Category;
}

export interface Topic {
  readonly id: string;
  readonly title: string;
  readonly author: User;
  readonly lastReplyBy?: User;
  readonly lastReplyAt: string;
  readonly postIndex: number;
  readonly categories: Set<Category>;
  readonly slug: string;
  readonly locked: boolean;
  readonly delete: boolean;
  readonly pinned: boolean;
  readonly feature: boolean;
  readonly lockedBy?: User;
  readonly deleteBy?: User;
  readonly createAt: string;
}

export interface Post {
  readonly id: string;
  readonly raw: string;
  readonly cooked: string;
  readonly topic: Topic;
  readonly author: User;
  readonly index: number;
  readonly lastEditAt?: string;
  readonly delete: boolean;
  readonly deleteBy?: User;
  readonly ip?: string;
  readonly createAt: string;
}

export interface Notification {
  readonly id: string;
  readonly type: 'REPLY' | 'MENTION';
  readonly send: User;
  readonly to: User;
  readonly post: Post;
  readonly topic: Topic;
  readonly readAt: string;
  readonly createAt: string;
}

export interface Report {
  readonly id: string;
  readonly by: User;
  readonly post: Post;
  readonly reason: string;
  readonly handleAt: string;
  readonly createAt: string;
}
