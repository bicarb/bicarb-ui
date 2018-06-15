/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { clearUser, fetchUser } from '../actions/UserAction';
import UserHome from '../components/UserHome';
import { StoreState } from '../strore';

const mapStateToProps = ({ userStore }: StoreState) => {
  return {
    userStore,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, AnyAction>) => {
  return {
    fetchUser: (username: string) => dispatch(fetchUser(username)),
    clearUser: () => dispatch(clearUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserHome);
