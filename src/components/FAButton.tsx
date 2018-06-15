/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Theme, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { withRouter } from 'react-router';
import { Link, RouteComponentProps } from 'react-router-dom';
import G from '../global';

interface MatchParams {}

interface FAButtonProps {
  onClickForCreatePost?: () => void;
}

interface FAButtonState {}

const styles = (theme: Theme) => ({
  fab: {
    position: 'fixed' as 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

interface Styles { classes: { [className in keyof ReturnType<typeof styles>]: string }; theme: Theme; }

type Props = FAButtonProps & Styles & RouteComponentProps<MatchParams>;

// Floating Action Button
class FAButton extends React.Component<Props, FAButtonState> {
  render() {
    if (!G.auth) {
      return null;
    }

    const { classes, match } = this.props;
    return match.path.includes('/topic/') ? (
      <Button className={classes.fab} variant="fab" color="primary" aria-label="add" onClick={this.props.onClickForCreatePost}>
        <Icon>add</Icon>
      </Button>
    ) : (
      <Link to="/topic/new" style={{ textDecoration: 'none', color: 'initial' }}>
        <Button className={classes.fab} variant="fab" color="primary" aria-label="add">
          <Icon>add</Icon>
        </Button>
      </Link>
    );
  }
}

export default withStyles(styles)<FAButtonProps>(withRouter(FAButton));