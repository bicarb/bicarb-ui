/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid/Grid';
import Hidden from '@material-ui/core/Hidden/Hidden';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Paper from '@material-ui/core/Paper';
import { Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth/withWidth';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { compose } from 'recompose';
import G from '../global';
import { TopicStore } from '../strore';
import { timeSince } from '../util/timeUtil';
import Cooked from './common/Cooked';
import LoadMoreButton from './common/LoadMoreButton';
import UserAvatar from './common/UserAvatar';
import CreatePost from './CreatePost';
import FAButton from './FAButton';

interface TopicStateProps {
  topicStore: TopicStore;
}

interface TopicDispatchProps {
  fetchPosts: (topicId: string, nextPage?: boolean) => void;
  clearPosts: () => void;
}

interface TopicOtherProps {}

type TopicProps = TopicStateProps & TopicDispatchProps & TopicOtherProps;

interface TopicState {
  openReply: boolean;
}

const styles = (theme: Theme) => ({
  title: {
    padding: theme.spacing.unit * 2,
  },
  iconButton: {
    width: 36,
    height: 36,
  }
});

interface ClassNames { classes: { [className in keyof ReturnType<typeof styles>]: string }; }

interface RouterParams {
  topicId: string;
}

type Props = TopicProps & ClassNames & RouteComponentProps<RouterParams>;

class Topic extends React.Component<Props, TopicState> {
  
  constructor(props: Props) {
    super(props);
    this.state = {
      openReply: false,
    };
  }

  componentDidMount() {
    const { fetchPosts, match } = this.props;
    fetchPosts(match.params.topicId);
  }

  componentWillUnmount() {
    this.props.clearPosts();
  }

  handleOpenReply = () => {
    this.setState({ openReply: true });
  }

  handleCloseReply = () => {
    this.setState({ openReply: false });
  }

  handleLoadMoreClick = () => {
    const { fetchPosts, match } = this.props;
    fetchPosts(match.params.topicId, true);
  }

  render() {
    const { classes, topicStore, match, fetchPosts } = this.props;
    return (
      <Paper>
        <CreatePost
          open={this.state.openReply}
          handleClose={this.handleCloseReply}
          topicId={match.params.topicId}
          fetchPosts={fetchPosts}
        />
        {/* topic header */}
        <div className={classes.title}>
          <Typography variant="headline">
            {topicStore.main.length > 0 ? topicStore.main[0].topic.title : ''}
          </Typography>
        </div>
        <Divider />
        {/* posts */}
        <List>
          {/* post / comment / reply */}
          {topicStore.main.map((post) => (
            <React.Fragment key={post.id}>
              <ListItem>
                <Grid container={true}>
                  <Hidden only="xs">
                    <Grid item={true}>
                      <UserAvatar user={post.author} />
                    </Grid>
                  </Hidden>
                  <Grid container={true} direction="column" item={true} xs={true}>
                    <Grid container={true} item={true}>
                      <Grid item={true}>
                        <Hidden smUp={true}>
                          <Grid item={true}>
                            <UserAvatar user={post.author} />
                          </Grid>
                        </Hidden>
                      </Grid>
                      <Grid item={true} xs={true}>
                        <Typography variant="body2" color="inherit">
                          <span>{post.author.username}</span>
                          <span> • </span>
                          <span>{timeSince(new Date(post.createAt))}</span>
                          { post.lastEditAt && <span> • edited</span> }
                        </Typography>
                      </Grid>
                      <Grid item={true}>
                        <Typography variant="body2" color="inherit">
                          # {post.index}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item={true} xs={true}>
                      <Cooked content={post.cooked} />
                    </Grid>
                    <Grid container={true} item={true}>
                      <Grid item={true} xs={true} />
                      <Grid item={true}>
                        {G.auth && post.index !== 0 &&
                        <IconButton
                          onClick={this.handleOpenReply}
                          className={classes.iconButton}
                          color="inherit"
                          aria-label="reply"
                        >
                          <Icon>reply</Icon>
                        </IconButton>
                        }
                        <IconButton className={classes.iconButton} color="inherit" aria-label="more">
                          <Icon>more_vert</Icon>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider inset={true} component="li" />
            </React.Fragment>
          ))}
        </List>
        <FAButton onClickForCreatePost={this.handleOpenReply} />
        <LoadMoreButton
          hasMore={topicStore.hasMore}
          isFetching={topicStore.isFetching}
          onClick={this.handleLoadMoreClick}
        />
      </Paper>
    );
  }
}

export default compose<TopicProps, TopicProps>(
  withStyles(styles, { withTheme: true }),
  withWidth(),
)(Topic);