/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import { Theme, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import T from '../i18n';

interface SearchBarProps {
  open: boolean;
  onClose: () => void;
}

interface SearchBarState {
  q: string;
}

const styles = (theme: Theme) => ({
  searchField: {
    margin: 0,
  },
  leftButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  rightButton: {
    marginRight: -12,
  },
});

interface Styles { classes: { [className in keyof ReturnType<typeof styles>]: string }; theme: Theme; }

type Props = SearchBarProps & Styles & RouteComponentProps<{}>;

class SearchBar extends React.Component<Props, SearchBarState> {
  inputRef: HTMLInputElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      q: '',
    };
  }

  setRef = (ref: HTMLInputElement) => {
    this.inputRef = ref;
  }

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      q: event.target.value,
    });
  }

  handleInputEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const q = this.state.q;
      if (q !== '' && `?q=${q}` !== decodeURI(this.props.location.search)) {
        this.props.history.push(`/search?q=${q}`);
      }
      this.props.onClose();
    }
  }

  handleClearClick = () => {
    this.setState({
      q: '',
    });
    this.inputRef.focus();
  }

  render() {
    const { classes, open, onClose } = this.props;
    return (
      <Modal open={open} onClose={onClose}>
        <AppBar color="default">
          <Toolbar>
            <IconButton
              className={classes.leftButton}
              color="inherit"
              aria-label="close"
              onClick={onClose}
            >
              <Icon>arrow_back</Icon>
            </IconButton>
            <Input
              id="search-text-filed"
              className={classes.searchField}
              // margin="dense"
              placeholder={T.search.T}
              value={this.state.q}
              onChange={this.onInputChange}
              onKeyPress={this.handleInputEnter}
              inputRef={this.setRef}
              fullWidth={true}
              autoFocus={true}
              disableUnderline={true}
            />
            <IconButton
              color="inherit"
              aria-label="clear"
              className={classes.rightButton}
              onClick={this.handleClearClick}>
              <Icon>clear</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Modal>
    );
  }
}

export default withStyles(styles, { withTheme: true })<SearchBarProps>(withRouter(SearchBar));