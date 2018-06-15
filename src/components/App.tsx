/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { Theme, withStyles } from '@material-ui/core/styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import NotificationsContainer from '../containers/NotificationsContainer';
import SearchResultContainer from '../containers/SearchResultContainer';
import TopicContainer from '../containers/TopicContainer';
import TopicsContainer from '../containers/TopicsContainer';
import UserHomeContainer from '../containers/UserHomeContainer';
import history from '../global/history';
import CommonAppBar from './CommonAppBar';
import CreateTopic from './CreateTopic';
import PageNotFound from './PageNotFound';
import Setting from './Setting';
import Snackbars from './Snackbars';

interface AppProps {}

interface AppState {
  openSidebar: boolean;
}

const styles = (theme: Theme) => ({
  main: {
    [theme.breakpoints.up('sm')]: {
      margin: '20px 80px',
      // transition: theme.transitions.create('margin', {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.leavingScreen,
      // }),
    },
  },
  contentShift: {
    [theme.breakpoints.up('sm')]: {
      // transition: theme.transitions.create('margin', {
      //   easing: theme.transitions.easing.easeOut,
      //   duration: theme.transitions.duration.enteringScreen,
      // }),
      marginLeft: 280,
    },
  },
  toolbar: { ...theme.mixins.toolbar },
});

interface Styles { classes: { [className in keyof ReturnType<typeof styles>]: string }; theme: Theme; }

class App extends React.Component<AppProps & Styles, AppState> {

  constructor(props: AppProps & Styles) {
    super(props);
    this.state = {
      openSidebar: window.innerWidth >= props.theme.breakpoints.values.sm,
    };
  }

  handleDrawerToggle = () => {
    this.setState((prevState, props) => ({
      openSidebar: !prevState.openSidebar,
    }));
  }

  handleDrawerOpen = () => {
    this.setState({ openSidebar: true });
  }

  handleDrawerClose = () => {
    this.setState({ openSidebar: false });
  }

  render() {
    const { classes } = this.props;
    const { openSidebar } = this.state;
    return (
      <ConnectedRouter history={history}>
        <>
          <CommonAppBar 
            openSidebar={this.state.openSidebar}
            handleDrawerToggle={this.handleDrawerToggle}
            handleDrawerOpen={this.handleDrawerOpen}
            handleDrawerClose={this.handleDrawerClose}
          />
          <main className={classNames(classes.main, { [classes.contentShift]: openSidebar })}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact={true} path="/" component={TopicsContainer} />
              <Route exact={true} path="/feature" component={TopicsContainer} />
              {/* <Route exact={true} path="/categories" component={Categories} /> */}
              <Route exact={true} path="/category/:category" component={TopicsContainer} />
              <Route exact={true} path="/topic/new" component={CreateTopic} />
              <Route path="/topic/:topicId" component={TopicContainer} />
              <Route exact={true} path="/notifications" component={NotificationsContainer} />
              <Route exact={true} path="/user/:username" component={UserHomeContainer} />
              <Route exact={true} path="/setting" component={Setting} />
              <Route exact={true} path="/search" component={SearchResultContainer} />
              <Route component={PageNotFound} />
            </Switch>
          </main>
          <Snackbars />
        </>
      </ConnectedRouter>
    );
  }
}

export default withStyles(styles, { withTheme: true })<AppProps>(App);