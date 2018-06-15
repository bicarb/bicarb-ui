/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchTopics, fetchTopicsForNewTab } from '../actions/TopicsAction';
import Topics from '../components/Topics';
import { StoreState } from '../strore';

export function mapStateToProps({ router, topicsStore }: StoreState) {
  return {
    router,
    topicsStore,
  };
}

export function mapDispatchToProps(dispatch: ThunkDispatch<StoreState, void, AnyAction>) {
  return {
    fetchTopics: (nextPage?: boolean) => dispatch(fetchTopics(nextPage)),
    fetchTopicsForNewTab: (index: number) => dispatch(fetchTopicsForNewTab(index)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Topics));