/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import Paper from '@material-ui/core/Paper';
import { Theme, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import T from '../i18n';
import EmptyContent from './EmptyContent';

interface PageNotFoundProps {}
interface PageNotFoundState {}

const styles = (theme: Theme) => ({});

interface ClassNames { classes: { [className in keyof ReturnType<typeof styles>]: string }; }

class PageNotFound extends React.Component<PageNotFoundProps & ClassNames, PageNotFoundState> {
  render() {
    return (
      <Paper>
        <EmptyContent>
          404 {T.pageNotFound}
        </EmptyContent>
      </Paper>
    );
  }
}

export default withStyles(styles)<PageNotFoundProps>(PageNotFound);