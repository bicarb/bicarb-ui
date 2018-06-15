/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import Paper from '@material-ui/core/Paper';
import { Theme, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RouterState } from 'react-router-redux';
import SwipeableViews from 'react-swipeable-views';
import T from '../i18n';
import { TopicsStore } from '../strore';
import LoadMoreButton from './common/LoadMoreButton';
import commonStyles from './common/styles';
import EmptyContent from './EmptyContent';
import FAButton from './FAButton';
import TopicList from './TopicList';

interface MatchParams {
  category: string;
}

interface TopicsStateProps {
  router: RouterState;
  topicsStore: TopicsStore;
}

interface TopicsDispatchProps {
  fetchTopics: (nextPage?: boolean) => void;
  fetchTopicsForNewTab: (index: number) => void;
}

interface TopicsOtherProps extends RouteComponentProps<MatchParams> {}

type TopicsProps = TopicsStateProps & TopicsDispatchProps & TopicsOtherProps;

interface TopicsState {}

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  buttonContainer: {
    textAlign: 'center' as 'center',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  orderTabs: {
    ...commonStyles.stickAfterAppBar,
    zIndex: theme.zIndex.appBar,
  },
  linearProgressPlaceHolder: {
    height: 5,
  },
});

interface Styles { classes: { [className in keyof ReturnType<typeof styles>]: string }; theme: Theme; }

type Props = TopicsProps & Styles;

class Topics extends React.Component<Props, TopicsState> {

  /**
   * '/', '/feature', '/category/:category-slug' share this component.
   */
  componentWillReceiveProps(nextProps: Props) {
    const location = this.props.router.location;
    const nextLocation = nextProps.router.location;
    const pathname = location ? location.pathname : null;
    const nextPathname = nextLocation ? nextLocation.pathname : null;
    if (pathname !== nextPathname) {
      this.props.fetchTopics();
    }
  }

  componentDidMount() {
    this.props.fetchTopics();
  }

  handleTabChange = (event: React.ChangeEvent<{}>, value: number) => {
    this.props.fetchTopicsForNewTab(value);
  }

  handleSwipeChange = (index: number) => {
    this.props.fetchTopicsForNewTab(index);
  }
  
  handleLoadMoreClick = () => {
    this.props.fetchTopics(true);
  }

  render() {
    const { classes , theme, topicsStore } = this.props;
    return (
      <Paper>
        <Tabs
          className={classes.orderTabs}
          value={topicsStore.tabIndex}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered={true}
        >
          <Tab label={T.latest} />
          <Tab label={T.newest} />
          <Tab label={T.top} />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={topicsStore.tabIndex}
          animateHeight={true}
          onChangeIndex={this.handleSwipeChange}
        >
          {[0, 1, 2].map(value =>
            topicsStore.tabIndex === value
              ? <Paper dir={theme.direction} key={value}><TopicList topics={topicsStore.main}/></Paper>
              : <Paper dir={theme.direction} key={value}><EmptyContent>{T.loading}</EmptyContent></Paper>
          )}
        </SwipeableViews>
        <FAButton />
        <LoadMoreButton
          hasMore={topicsStore.hasMore}
          isFetching={topicsStore.isFetching}
          onClick={this.handleLoadMoreClick}
        />
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })<TopicsProps>(Topics);