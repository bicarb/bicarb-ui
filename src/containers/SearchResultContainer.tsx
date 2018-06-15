/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchSearchResult } from '../actions/SearchResultActions';
import SearchResult from '../components/SearchResult';
import { StoreState } from '../strore';

const mapStateToProps = ({ searchResultStore, router }: StoreState) => {
  return {
    searchResultStore,
    router,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, AnyAction>) => {
  return {
    fetchSearchResult: (q: string, nextPage?: boolean) => dispatch(fetchSearchResult(q, nextPage)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResult);