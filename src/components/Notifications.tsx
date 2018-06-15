/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Paper from '@material-ui/core/Paper';
import { Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import T from '../i18n';
import { NotificationsStore, Topic } from '../strore';
import { stripHtml } from '../util/strings';
import { timeSince } from '../util/timeUtil';
import LoadMoreButton from './common/LoadMoreButton';
import UserAvatar from './common/UserAvatar';

interface NotificationsStateProps {
  notificationsStore: NotificationsStore;
}

interface NotificationsDispatchProps {
  fetchNotifications: (nextPage?: boolean) => void;
}

interface NotificationsOtherProps {}

type NotificationsProps = NotificationsStateProps & NotificationsDispatchProps & NotificationsOtherProps;

interface NotificationsState {}

const styles = (theme: Theme) => ({
  header: {
    padding: theme.spacing.unit * 2,
  },
});

interface ClassNames { classes: { [className in keyof ReturnType<typeof styles>]: string }; }

type Props = NotificationsProps & ClassNames & RouteComponentProps<{}>;

class Notifications extends React.Component<Props, NotificationsState> {

  componentDidMount() {
    this.props.fetchNotifications();
  }

  handleNotificationClick = (topic: Topic) => {
    this.props.history.push(`/topic/${topic.id}/${topic.slug}`);
  }

  handleLoadMoreClick = () => {
    this.props.fetchNotifications(true);
  }
  
  render() {
    const { classes, notificationsStore } = this.props;
    return (
      <Paper>
        {/* header */}
        <header className={classes.header}>
          <Typography variant="headline">
            {T.notification.T}
          </Typography>
        </header>
        <Divider />
        <List>
          {notificationsStore.main.map(notification => 
            <React.Fragment key={notification.id}>
              <ListItem button={true}>
                <UserAvatar user={notification.send} style={{ marginRight: 0 }} />
                <ListItemText onClick={this.handleNotificationClick.bind(this, notification.topic)}>
                  <Typography noWrap={true}>
                    {
                      notification.send.username
                      + ' • ' + (notification.type === 'MENTION' ? T.notification.type.mention : T.notification.type.reply)
                      + ' • ' + timeSince(new Date(notification.createAt))
                      + ' • '+ notification.topic.title
                    }
                  </Typography>
                  <Typography noWrap={true} variant="caption">
                    {`# ${notification.post.index} • ${stripHtml(notification.post.cooked)}`}
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          )}
        </List>
        <LoadMoreButton
          hasMore={notificationsStore.hasMore}
          isFetching={notificationsStore.isFetching}
          onClick={this.handleLoadMoreClick} />
      </Paper>
    );
  }
}

export default withStyles(styles, {  withTheme: true })<NotificationsProps>(Notifications);