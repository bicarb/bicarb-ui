/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { Theme } from '@material-ui/core';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { sprintf } from 'sprintf-js';
import { postSendVerifyEmail } from '../api';
import G from '../global';
import T from '../i18n';
import { User } from '../strore';

interface SnackbarsProps {}

interface SnackbarsState {}

const styles = (theme: Theme) => ({
  button: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

interface Styles { classes: { [className in keyof ReturnType<typeof styles>]: string }; theme: Theme; }

class Snackbars extends React.Component<SnackbarsProps & Styles, SnackbarsState> {

  static LAST_VERIFY_SEND_TIME = 'LAST_VERIFY_SEND_TIME';

  sendClick = () => {
    const lastTime = window.localStorage[Snackbars.LAST_VERIFY_SEND_TIME];
    if (!lastTime || new Date().getTime() - parseInt(lastTime, 10) > 1000 * 60) {
      window.localStorage[Snackbars.LAST_VERIFY_SEND_TIME] = new Date().getTime();
    } else {
      alert(T.snackbars.sendEmailTooFrequently);
      return;
    }

    postSendVerifyEmail().then(res => {
      if (res.status === 200) {
        alert(sprintf(T.verifyEmailWillSend, (G.auth as User).email));
      } else {
        alert('Error');
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom' as 'bottom',
            horizontal: 'left' as 'left',
          }}
          open={G.auth !== undefined && !G.auth.active}
          ContentProps={{
            'aria-describedby': 'inactive-message',
          }}
          message={<span id="inactive-message">{T.snackbars.verifyEmail}</span>}
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.button}
              onClick={this.sendClick}
            >
              <Icon>send</Icon>
            </IconButton>
          }
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })<SnackbarsProps>(Snackbars);