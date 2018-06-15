/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../strore';

interface UserAvatarProps {
  user: User;
  style?: React.CSSProperties;
}

interface UserAvatarState {}

const styles = (theme: Theme) => ({
  avatar: {
    marginRight: 16,
  },
  routerLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

interface Styles { classes: { [className in keyof ReturnType<typeof styles>]: string }; theme: Theme; }

class UserAvatar extends React.Component<UserAvatarProps & Styles, UserAvatarState> {
  render() {
    const { classes, user, style } = this.props;
    return (
      <Link to={`/user/${user.username}`} className={classes.routerLink}>
        {
          user.avatar 
            ? <Avatar style={style} className={classes.avatar} alt={user.username} src={`/upload/avatar/${user.avatar}`} />
            : <Avatar style={style} className={classes.avatar}>{user.username.charAt(0)}</Avatar>
        }
      </Link>
    );
  }
}

export default withStyles(styles, { withTheme: true })<UserAvatarProps>(UserAvatar);