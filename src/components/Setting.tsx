/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import Menu from '@material-ui/core/Menu/Menu';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Paper from '@material-ui/core/Paper';
import { Theme, withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography/Typography';
import * as Cookies from 'js-cookie';
import * as React from 'react';
import Dropzone, { ImageFile } from 'react-dropzone';
import { defaultFetch } from '../api/request';
import { C_LOCALE } from '../constants/cookie';
import G from '../global';
import { default as T, langSet } from '../i18n';

interface SettingStateProps {}

interface SettingDispatchProps {}

interface SettingOtherProps {}

type SettingProps = SettingStateProps & SettingDispatchProps & SettingOtherProps;

interface SettingState {
  anchorEl?: HTMLElement;
}

const styles = (theme: Theme) => ({});

interface ClassNames { classes: { [className in keyof ReturnType<typeof styles>]: string }; }

class Setting extends React.Component<SettingProps & ClassNames, SettingState> {

  langList: string[];

  constructor(props: SettingProps & ClassNames) {
    super(props);
    this.state = {
      anchorEl: undefined,
    };

    this.langList = Array.from(langSet.values());
  }

  handleClickLangItem = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleLangMenuClose = () => {
    this.setState({ anchorEl: undefined });
  }

  handleLangMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    Cookies.set(C_LOCALE, this.langList[index], { expires: 365 });
    location.reload();
  }

  handleDropAvatar = (acceptFiles: ImageFile[]) => {
    const file = acceptFiles[0];
    const data = new FormData();
    data.append('file', file);

    defaultFetch('/api/upload/avatar', {
      method: 'POST',
      body: data,
    }).then((res) => {
      if (res.status === 201) {
        location.reload();
      } else {
        window.alert('Error');
      }
    });
  }

  render() {
    // const { classes } = this.props;
    const currentLang = Cookies.get(C_LOCALE);
    return (
      <Paper>
        {G.auth &&
          <List>
            <ListSubheader>{T.setting.account.T}</ListSubheader>
            <ListItem button={true}>
              <Dropzone
                style={{ width: '100%', height: '100%' }}
                accept="image/jpeg, image/png, image/gif"
                onDrop={this.handleDropAvatar}
                maxSize={5242880} >
                <Typography variant="subheading">
                  {T.setting.account.changeAvatar}
                </Typography>
              </Dropzone>
            </ListItem>
            <Divider />

            <ListItem button={true}>
              <ListItemText primary={T.setting.account.changePassword} />
            </ListItem>
            <Divider />
            <ListItem button={true}>
              <ListItemText primary={T.setting.account.publicEmail} />
              <ListItemSecondaryAction>
                <Switch />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />

          </List>
        }

        <List>
          <ListSubheader>{T.setting.general.T}</ListSubheader>
          <ListItem
            button={true}
            aria-haspopup="true"
            aria-controls="language-menu"
            aria-label="Which language is used"
            onClick={this.handleClickLangItem}
          >
            <ListItemText primary={T.setting.general.changeLanguage} secondary={currentLang ? currentLang : 'en'} />
          </ListItem>
          <Divider />
        </List>

        {/* language menu */}
        <Menu
          id="language-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleLangMenuClose}
        >
          {this.langList.map((language, index) => (
            <MenuItem
              key={language}
              onClick={event => this.handleLangMenuItemClick(event, index)}
            >
              {language}
            </MenuItem>
          ))}
        </Menu>
      </Paper>
    );
  }
}

export default withStyles(styles)<SettingProps>(Setting);