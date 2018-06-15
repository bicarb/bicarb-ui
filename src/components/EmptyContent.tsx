/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { Theme, withStyles } from '@material-ui/core/styles';
import * as React from 'react';

interface EmptyContentProps {}

interface EmptyContentState {
  height: number;
}

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: '0 0 auto',
  },
});

interface Styles { classes: { [className in keyof ReturnType<typeof styles>]: string }; theme: Theme; }

class EmptyContent extends React.Component<EmptyContentProps & Styles, EmptyContentState> {
  root: HTMLDivElement;

  constructor(props: EmptyContentProps & Styles) {
    super(props);
    this.state = {
      height: 0,
    };
  }

  updateHeight = () => {
    const bottomPadding = window.innerWidth < 600 ? 0 : 20;
    this.setState({
      height: window.innerHeight - this.root.getBoundingClientRect().top - bottomPadding,
    });
  }

  componentDidMount() {
    this.updateHeight();
    window.addEventListener('resize', this.updateHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight);
  }

  render() {
    const { classes } = this.props;
    return (
      <div
        ref={(root: HTMLDivElement) => this.root = root}
        className={classes.root}
        style={{ height: this.state.height }}
      >
        <div className={classes.container}>
          {this.props.children && this.props.children}
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })<EmptyContentProps>(EmptyContent);