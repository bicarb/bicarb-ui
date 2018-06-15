/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { clearPosts, fetchPosts } from '../actions/TopicAction';
import Topic from '../components/Topic';
import { StoreState } from '../strore';

const mapStateToProps = ({ topicStore }: StoreState) => {
  return {
    topicStore,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, AnyAction>) => {
  return {
    fetchPosts: (topicId: string, nextPage?: boolean) => dispatch(fetchPosts(topicId, nextPage)),
    clearPosts: () => dispatch(clearPosts()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Topic);