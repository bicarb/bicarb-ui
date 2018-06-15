/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { Theme, withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth/withWidth';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { compose } from 'recompose';
import G from '../global';
import T from '../i18n';

interface SideBarStateProps {
  sideBarWidth: number;
  handleSignUpOpen: () => void;
  handleSignInOpen: () => void;
}

interface SideBarDispatchProps {}

interface SideBarOtherProps {}

type SideBarProps = SideBarStateProps & SideBarDispatchProps & SideBarOtherProps;

interface SideBarState {}

const styles = (theme: Theme) => ({
  avatar: {
    width: 64,
    height: 64,
  },
  header: {
    backgroundImage: 'url(/bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
});

interface ClassNames { classes: { [className in keyof ReturnType<typeof styles>]: string }; theme: Theme; }

class SideBar extends React.Component<SideBarProps & ClassNames, SideBarState> {

  static navBuilder = (pathname: string, icon: string, title: string) => (
    <NavLink to={pathname} style={{ textDecoration: 'none', color: 'initial' }}>
      <ListItem button={true}>
        <ListItemIcon><Icon>{icon}</Icon></ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </NavLink>
  )

  logout = () => {
    (document as any).logoutForm.submit();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Hidden smUp={true}>
          <div
            className={classes.header}
            style={{ maxWidth: this.props.sideBarWidth, height: this.props.sideBarWidth * 9 / 16 }} />
        </Hidden>
        <Hidden only="xs">
          <div className={classes.toolbar}/>
        </Hidden>
        {G.auth === undefined &&
          <Hidden smUp={true}>
            <List component="nav">
              <ListItem button={true} onClick={this.props.handleSignUpOpen}>
                <ListItemIcon><Icon>person_add</Icon></ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItem>
              <ListItem button={true} onClick={this.props.handleSignInOpen}>
                <ListItemIcon><Icon>input</Icon></ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItem>
            </List>
            <Divider />
          </Hidden>
        }
        <List component="nav">
          {SideBar.navBuilder('/', 'home', T.sidebar.home)}
          {SideBar.navBuilder('/feature', 'star_rate', T.sidebar.feature)}
          {SideBar.navBuilder('/categories', 'bookmark', T.sidebar.categories)}
        </List>
        <Divider />
        <List component="nav">
          {G.categories.map(category => String(category.id) !== '0'
            ? <React.Fragment key={category.id}>
                {SideBar.navBuilder(`/category/${category.slug}`, 'label', category.name)}
              </React.Fragment>
            : null)}
        </List>
        <Divider />
        <List component="nav">
          {G.auth && SideBar.navBuilder(`/user/${G.auth.username}`, 'account_circle', T.sidebar.profile)}
          {SideBar.navBuilder('/setting', 'settings', T.setting.T)}
          {G.auth &&
          <ListItem button={true} onClick={this.logout}>
            <ListItemIcon><Icon>directions_run</Icon></ListItemIcon>
            <ListItemText primary={T.sidebar.logout} />
            <form method="post" action="/logout" name="logoutForm" style={{ display: 'none' }}>
              <input type="hidden" name={G.csrfParameter} value={G.csrf} />
            </form>
          </ListItem>
          }
        </List>
      </div>
    );
  }
}

export default compose<SideBarProps, SideBarProps>(withStyles(styles), withWidth())(SideBar);
// export default withStyles(styles)<SideBarProps>(SideBar);