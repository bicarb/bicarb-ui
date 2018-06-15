/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Theme, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import T from '../i18n';
import { UserStore } from '../strore';
import commonStyles from './common/styles';
import EmptyContent from './EmptyContent';

interface UserHomeStateProps {
  userStore: UserStore;
}

interface UserHomeDispatchProps {
  fetchUser: (username: string) => void;
  clearUser: () => void;
}

interface UserHomeOtherProps {}

type UserHomeProps = UserHomeStateProps & UserHomeDispatchProps & UserHomeOtherProps;

interface UserHomeState {
  value: number;
}

const styles = (theme: Theme) => ({
  userInfoContainer: {
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center' as 'center',
    },
  },
  userInfoAvatarContainer: {
    [theme.breakpoints.down('xs')]: {
      margin: `0 auto ${theme.spacing.unit * 2}px`,
    },
  },
  userInfoAvatar: {
    width: 64,
    height: 64,
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing.unit * 2,
    },
  },
  userTabs: {
    ...commonStyles.stickAfterAppBar,
    zIndex: theme.zIndex.appBar,
  },
});

interface ClassNames { classes: { [className in keyof ReturnType<typeof styles>]: string }; theme: Theme; }

interface RouterParams {
  username: string;
}

type Props = UserHomeProps & ClassNames & RouteComponentProps<RouterParams>;

class UserHome extends React.Component<Props, UserHomeState> {

  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
    };  
  }

  componentDidMount() {
    const { fetchUser, match } = this.props;
    fetchUser(match.params.username);
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    this.setState({ value });
  }

  handleChangeIndex = (index: number) => {
    this.setState({ value: index });
  }

  render() {
    const { classes, theme, userStore } = this.props;
    const user = userStore.main;
    return user === undefined ? (
      <Paper>
        <EmptyContent>Loading...</EmptyContent>
      </Paper>
    ) : (
      <Paper>
        {/* user info */}
        <Grid className={classes.userInfoContainer} container={true}>
          <Grid className={classes.userInfoAvatarContainer} item={true}>
            {
              user.avatar ? (
                <Avatar className={classes.userInfoAvatar} alt={user.username} src={`/upload/avatar/${user.avatar}`} />
              ) : (
                <Avatar className={classes.userInfoAvatar}>{user.username.charAt(0)}</Avatar>
              )
            }
          </Grid>
          <Grid container={true} item={true} xs={12} sm={true}>
            <Grid item={true} xs={12}>
              <Typography variant="headline">{user.username}</Typography>
            </Grid>
            <Grid item={true} xs={12}>
              <Typography variant="body1">{user.bio}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        {/* posts / topics */}
        <Tabs
          className={classes.userTabs}
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered={true}
        >
          <Tab label={T.posts} />
          <Tab label={T.topics} />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          animateHeight={true}
          onChangeIndex={this.handleChangeIndex}
        >
          <Paper dir={theme.direction} />
          <Paper dir={theme.direction} />
        </SwipeableViews>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })<UserHomeProps>(UserHome);