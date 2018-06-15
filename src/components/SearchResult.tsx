/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { Theme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Paper from '@material-ui/core/Paper/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { RouterState } from 'react-router-redux';
import { sprintf } from 'sprintf-js';
import T from '../i18n';
import { SearchResultStore, Topic } from '../strore';
import { stripHtml } from '../util/strings';
import { timeSince } from '../util/timeUtil';
import LoadMoreButton from './common/LoadMoreButton';
import UserAvatar from './common/UserAvatar';

interface SearchResultStateProps {
  searchResultStore: SearchResultStore;
  router: RouterState;
}

interface SearchResultDispatchProps {
  fetchSearchResult: (q: string, nextPage?: boolean) => void;
}

interface SearchResultOtherProps {}

type SearchResultProps = SearchResultStateProps & SearchResultDispatchProps & SearchResultOtherProps;

interface SearchResultState {}

const styles = (theme: Theme) => ({
  header: {
    padding: theme.spacing.unit * 2,
  },
});

interface Styles { classes: { [className in keyof ReturnType<typeof styles>]: string }; theme: Theme; }

type Props = SearchResultProps & Styles & RouteComponentProps<{}>;

const getQuery = (search: string): string | undefined => {
  const matcher = search.match(/\?(?:[^&]+&)*q=([^&]+)(?:&[^&]+)*/);
  if (matcher !== null) {
    return decodeURI(matcher.pop() as string);
  } else {
    return undefined;
  }
};

class SearchResult extends React.Component<Props, SearchResultState> {

  componentWillReceiveProps(nextProps: Props) {
    const nextSearch = nextProps.location.search;
    const thisSearch = this.props.location.search;
    if (nextSearch !== thisSearch) {
      this.handleFetch(nextSearch);
    }
  }

  componentDidMount() {
    this.handleFetch(this.props.location.search);
  }

  handleFetch = (search: string, nextPage?: boolean) => {
    const query = getQuery(search);
    if (query) {
      this.props.fetchSearchResult(query, nextPage);
    }
  }

  handlePostClick = (topic: Topic) => {
    this.props.history.push(`/topic/${topic.id}/${topic.slug}`);
  }

  render() {
    const { classes, searchResultStore } = this.props;
    return (
      <Paper>
        {/* header */}
        <header className={classes.header}>
          <Typography variant="headline">
            {T.search.resultTitle}

            {!searchResultStore.isFetching &&
              <span> • {sprintf(T.search.totalRecords, searchResultStore.totalRecords)}</span>
            }
          </Typography>
        </header>
        <Divider />
        
        <List>
          {searchResultStore.main.map(post =>
            <React.Fragment key={post.id}>
              <ListItem button={true}>
                <UserAvatar user={post.author} style={{ marginRight: 0 }} />
                <ListItemText onClick={this.handlePostClick.bind(this, post.topic)}>
                  <Typography noWrap={true}>
                    {
                      sprintf(T.search.in, post.topic.title)
                      + ' • ' + sprintf(T.search.postAt, timeSince(new Date(post.createAt)))
                    }
                  </Typography>
                  <Typography noWrap={true} variant="caption">
                    {`# ${post.index} • ${stripHtml(post.cooked)}`}
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          )}
        </List>
        
        <LoadMoreButton
          hasMore={searchResultStore.hasMore}
          isFetching={searchResultStore.isFetching}
          onClick={this.handleFetch.bind(this, this.props.location.search, true)}
        />
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })<SearchResultProps>(SearchResult);