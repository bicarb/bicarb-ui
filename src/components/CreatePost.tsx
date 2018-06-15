/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { Theme, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withMobileDialog, { InjectedProps } from '@material-ui/core/withMobileDialog/withMobileDialog';
import * as React from 'react';
import { postCreatePost } from '../api';
import T from '../i18n';
import Editor from './Editor';

interface CreatePostProps {
  open: boolean;
  handleClose: () => void;
  topicId: string;
  fetchPosts: (topicId: string, nextPage?: boolean) => void;
}

interface CreatePostState {
  content: string;
  isCreating: boolean;
}

const styles = (theme: Theme) => ({
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
});

interface Styles { classes: { [className in keyof ReturnType<typeof styles>]: string }; theme: Theme; }

type Props = CreatePostProps & Styles & InjectedProps;

class CreatePost extends React.Component<Props, CreatePostState> {

  constructor(props: Props) {
    super(props);
    this.state = {
      content: '',
      isCreating: false,
    };
  }

  onValueChange = (value: string) => {
    this.setState({
      content: value,
    });
  }

  onDoneClick = () => {
    const { content } = this.state;
    const { topicId, fetchPosts, handleClose } = this.props;
    if (content === '') {
      window.alert(T.createPost.contentEmpty);
    } else {
      this.setState({ isCreating: true });
      postCreatePost(topicId, content).then(res => {
        this.setState({ isCreating: false });
        if (res.status === 201) {
          this.setState({
            content: '',
          });
          handleClose();
          fetchPosts(topicId);
        } else {
          window.alert('Error');
        }
      });
    }
  }

  render() {
    const { classes, open, fullScreen, handleClose } = this.props;
    const { content, isCreating } = this.state;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="create-post-dialog"
        maxWidth={false}
      >
        <Toolbar>
          <IconButton onClick={handleClose} className={classes.leftButton}>
            <Icon>arrow_back</Icon>
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {T.createPost.T}
          </Typography>
          <IconButton onClick={this.onDoneClick} className={classes.rightButton} disabled={isCreating}>
            <Icon>done</Icon>
          </IconButton>
        </Toolbar>
        <DialogContent>
          <Editor
            content={content}
            topicBody={false}
            onValueChange={this.onValueChange} />
        </DialogContent>
      </Dialog>
    );
  }
}

export default withMobileDialog<CreatePostProps>({ breakpoint: 'xs' })
    (withStyles(styles, { withTheme: true })<CreatePostProps>(CreatePost));