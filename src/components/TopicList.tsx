/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import { Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';
import T from '../i18n';
import { Topic } from '../strore';
import { timeSince } from '../util/timeUtil';
import UserAvatar from './common/UserAvatar';

interface TopicListProps {
  topics: Topic[];
}

interface TopicListState {}

const styles = (theme: Theme) => ({
  postIndexContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '1rem',
  },
  iconWithText: {
    fontSize: 'inherit',
  }
});

interface Styles { classes: { [className in keyof ReturnType<typeof styles>]: string }; }

class TopicList extends React.Component<TopicListProps & Styles, TopicListState> {
  render() {
    const { topics, classes } = this.props;
    return (
      <List>
        {topics.map((topic) => (
          <React.Fragment key={topic.id}>
            <ListItem button={true}>
              <Grid container={true}>
                <Grid item={true}>
                  <UserAvatar user={topic.author} />
                </Grid>
                <Grid container={true} direction="column" item={true} xs={true}>
                  <Grid item={true}>
                    <Link to={`/topic/${topic.id}/${topic.slug}`} style={{ textDecoration: 'none', color: 'initial' }}>
                      <Typography variant="subheading" color="inherit">
                        {topic.pinned && <Icon className={classes.iconWithText}>loyalty</Icon>}
                        {topic.feature && <Icon className={classes.iconWithText}>star_rate</Icon>}
                        {topic.locked && <Icon className={classes.iconWithText}>lock</Icon>}
                        {topic.title}
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item={true}>
                    <Typography>
                      <Link
                        style={{ textDecoration: 'none', color: 'initial', fontWeight: 'bold' }}
                        to={`/user/${topic.lastReplyBy ? topic.lastReplyBy.username : topic.author.username}`}>
                        {topic.author.username}
                      </Link>
                      <span> • </span>
                      {topic.lastReplyBy &&
                        <Link
                          style={{ textDecoration: 'none', color: 'initial', fontWeight: 'bold' }}
                          to={`/user/${topic.lastReplyBy.username}`}>
                          {topic.lastReplyBy.username + ' '}
                        </Link>
                      }
                      <span>{topic.postIndex === 0 ? T.createAt : T.lastReplyAt}</span>
                      <span>{timeSince(new Date(topic.lastReplyAt))}</span>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item={true} className={classes.postIndexContainer}>
                  <Typography variant="body2">
                    {topic.postIndex > 0 && topic.postIndex}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider inset={true} component="li" />
          </React.Fragment>
        ))}
      </List>
    );
  }
}

export default withStyles(styles, { withTheme: true })<TopicListProps>(TopicList);