/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import Fade from '@material-ui/core/Fade/Fade';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import T from '../../i18n';

interface LoadMoreButtonProps {
  hasMore: boolean;
  isFetching: boolean;
  onClick: () => void;
}

interface LoadMoreButtonState {}

const styles = (theme: Theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  buttonContainer: {
    textAlign: 'center' as 'center',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  linearProgressPlaceHolder: {
    height: 5,
  },
});

interface Styles { classes: { [className in keyof ReturnType<typeof styles>]: string }; theme: Theme; }

class LoadMoreButton extends React.Component<LoadMoreButtonProps & Styles, LoadMoreButtonState> {
  render() {
    const { classes, hasMore, isFetching, onClick } = this.props;
    return (
      <>
        <div className={classes.linearProgressPlaceHolder}>
          <Fade
            in={isFetching}
            style={{
              transitionDelay: isFetching ? '300ms' : '0ms',
            }}
            unmountOnExit={true} >
            <LinearProgress />
          </Fade>
        </div>
        {hasMore &&
        <div className={classes.buttonContainer}>
          <Button variant="raised" className={classes.button} disabled={isFetching} onClick={onClick}>
            {T.loadMore}
          </Button>
        </div>
        }
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })<LoadMoreButtonProps>(LoadMoreButton);