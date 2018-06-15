/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Hidden from '@material-ui/core/Hidden/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { Theme, withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withMobileDialog, { InjectedProps } from '@material-ui/core/withMobileDialog/withMobileDialog';
import withWidth, { WithWidthProps } from '@material-ui/core/withWidth/withWidth';
import * as React from 'react';
import { Link, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import G from '../global';
import T from '../i18n';
import UserAvatar from './common/UserAvatar';
import SearchBar from './SearchBar';
import SideBar from './SideBar';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

interface CommonAppBarProps {
  openSidebar: boolean;
  handleDrawerToggle: () => void;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

interface CommonAppBarState {
  openSearch: boolean;
  openSignIn: boolean;
  openSignUp: boolean;
}

const sideBarWidth = window.innerWidth <= 420 ? window.innerWidth - 56 : 240;

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  leftButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  rightButton: {
    marginRight: -12,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  dialogTitleWithButton: {
    flex: '0 0 auto',
    margin: 0,
    padding: '24px 24px 20px 24px',
  },
  drawerPaper: {
    width: sideBarWidth,
  },
});

interface Styles { classes: { [className in keyof ReturnType<typeof styles>]: string }; theme: Theme; }

type Props = CommonAppBarProps & Styles & RouteComponentProps<{}> & WithWidthProps & InjectedProps;

class CommonAppBar extends React.Component<Props, CommonAppBarState> {

  constructor(props: Props) {
    super(props);
    this.state = {
      openSearch: false,
      openSignIn: false,
      openSignUp: false,
    };
  }

  routerGoBack = () => {
    this.props.history.goBack();
  }

  handleSignInOpen = () => {
    this.setState({ openSignIn: true });
  }

  handleSignInClose = () => {
    this.setState({ openSignIn: false });
  }

  handleSignUpOpen = () => {
    this.setState({ openSignUp: true });
  }

  handleSignUpClose = () => {
    this.setState({ openSignUp: false });
  }

  handleSearchOpen = () => {
    this.setState({ openSearch: true });
  }

  handleSearchClose = () => {
    this.setState({ openSearch: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <AppBar color="default" className={classes.root + ' ' + classes.appBar}>
          <Toolbar>
            {/* menu / back */}
            <Switch>
              <Route
                path="(/|/feature|/category/*)"
                component={() => (
                  <IconButton
                    className={classes.leftButton}
                    color="inherit"
                    aria-label="Menu"
                    onClick={this.props.handleDrawerToggle}
                  >
                    <Icon>menu</Icon>
                  </IconButton>
                )} 
              />
              <Route
                component={() => (
                  <IconButton
                    className={classes.leftButton}
                    color="inherit"
                    aria-label="Back"
                    onClick={this.routerGoBack}
                  >
                    <Icon>arrow_back</Icon>
                  </IconButton>
                )} 
              />
            </Switch>
            {/* title */}
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                {G.settings.has('title') ? G.settings.get('title') : 'Bicarb'}
              </Link>
            </Typography>
            {/* right buttons */}
            <IconButton onClick={this.handleSearchOpen} color="inherit" aria-label="search">
              <Icon>search</Icon>
            </IconButton>
            <SearchBar open={this.state.openSearch} onClose={this.handleSearchClose} />
            { G.auth &&
            <Link to="/notifications" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton color="inherit" aria-label="notifications">
                <Icon>notifications</Icon>
              </IconButton>
            </Link>
            }
            { G.auth === undefined &&
            <Hidden only="xs">
              <Button onClick={this.handleSignUpOpen}>{T.signUp.T}</Button>
            </Hidden>
            }
            { G.auth === undefined &&
            <Hidden only="xs">
              <Button onClick={this.handleSignInOpen}>{T.signIn.T}</Button>
            </Hidden>
            }
            { G.auth &&
            <Hidden only="xs">
              <UserAvatar user={G.auth} />
            </Hidden>
            }
            <IconButton color="inherit" aria-label="more" className={classes.rightButton}>
              <Icon>more_vert</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          disableBackdropTransition={!G.ios}
          disableDiscovery={G.ios}
          variant={this.props.width === 'xs' ? 'temporary' : 'persistent'}
          classes={{ paper: classes.drawerPaper, }}
          open={this.props.openSidebar}
          onClose={this.props.handleDrawerClose}
          onOpen={this.props.handleDrawerOpen}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.width === 'xs' ? this.props.handleDrawerClose : undefined}
            onKeyDown={this.props.width === 'xs' ? this.props.handleDrawerClose : undefined}
          >
            <SideBar
              sideBarWidth={sideBarWidth}
              handleSignInOpen={this.handleSignInOpen}
              handleSignUpOpen={this.handleSignUpOpen} />
          </div>
        </SwipeableDrawer>
        {/* sign in */}
        <Dialog
          fullScreen={this.props.fullScreen}
          open={this.state.openSignIn}
          onClose={this.handleSignInClose}
          aria-labelledby="signin-dialog"
        >
          <SignInForm onClose={this.handleSignInClose} />
        </Dialog>
        {/* sign up */}
        <Dialog
          fullScreen={this.props.fullScreen}
          open={this.state.openSignUp}
          onClose={this.handleSignUpClose}
          aria-labelledby="signup-dialog"
        >
          <SignUpForm onClose={this.handleSignUpClose} />
        </Dialog>
      </>
    );
  }
}

export default compose<CommonAppBarProps, CommonAppBarProps>(
  withMobileDialog({ breakpoint: 'xs' }), 
  withStyles(styles), 
  withWidth(),
)(withRouter(CommonAppBar));