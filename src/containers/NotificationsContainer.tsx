/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchNotifications } from '../actions/NotificationsAction';
import Notifications from '../components/Notifications';
import { StoreState } from '../strore';

const mapStateToProps = ({ notificationsStore }: StoreState) => {
  return {
    notificationsStore,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<StoreState, void, AnyAction>) => {
  return {
    fetchNotifications: (nextPage?: boolean) => dispatch(fetchNotifications(nextPage)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);