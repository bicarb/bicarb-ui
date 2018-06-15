/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import Dropzone, { ImageFile } from 'react-dropzone';
import { postPreview } from '../api';
import { defaultFetch } from '../api/request';
import T from '../i18n';
import {
  insertToCurrent,
  insertToLineEndOrBothSideForCurrentLineOrSelected,
  insertToLineStart
} from '../util/editorUtil';
import Cooked from './common/Cooked';

interface EditorProps {
  content: string;
  topicBody: boolean;
  onValueChange: (value: string) => void;
}

interface EditorState {
  isPreview: boolean;
  previewContent: string;
}

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit,
  },
  dropzone: {
    width: '100%',
    cursor: 'pointer',
    padding: 5,
  },
});

interface ClassNames { classes: { [className in keyof ReturnType<typeof styles>]: string }; }

class Editor extends React.Component<EditorProps & ClassNames, EditorState> {
  inputRef: HTMLInputElement;

  constructor(props: EditorProps & ClassNames) {
    super(props);
    this.state = {
      isPreview: false,
      previewContent: 'Loading...',
    };
  }

  setRef = (ref: HTMLInputElement) => {
    this.inputRef = ref;
  }

  titleClick = () => {
    insertToLineStart(this.inputRef, this.props.onValueChange, '## ');
  }

  boldClick = () => {
    insertToLineEndOrBothSideForCurrentLineOrSelected(
      this.inputRef, this.props.onValueChange, '**', '**');
  }

  italicClick = () => {
    insertToLineEndOrBothSideForCurrentLineOrSelected(
      this.inputRef, this.props.onValueChange, '_', '_');
  }

  codeClick = () => {
    insertToLineEndOrBothSideForCurrentLineOrSelected(
      this.inputRef, this.props.onValueChange, '`', '`', '\n```\n', '\n```\n');
  }

  linkClick = () => {
    insertToLineEndOrBothSideForCurrentLineOrSelected(
      this.inputRef, this.props.onValueChange, '[', '](url)');
  }

  photoClick= () => {
    insertToLineEndOrBothSideForCurrentLineOrSelected(
      this.inputRef, this.props.onValueChange, '![', '](url "title")');
  }

  unOrderListClick = () => {
    insertToCurrent(this.inputRef, this.props.onValueChange, '\n- \n');
  }

  orderedListClick = () => {
    insertToCurrent(this.inputRef, this.props.onValueChange, '\n1. \n');
  }

  previewClick = () => {
    this.setState({
      isPreview: true,
    });

    postPreview({body: this.props.content, topicBody: this.props.topicBody})
        .then(res => res.json())
        .then(json => {
          this.setState({
            previewContent: json.body,
          });
        });
  }

  editClick = () => {
    this.setState({
      isPreview: false,
      previewContent: 'Loading...',
    });
  }

  onDropFile = (acceptFiles: ImageFile[]) => {
    for (const file of acceptFiles) {
      const data = new FormData();
      data.append('file', file);

      defaultFetch('/api/upload', {
        method: 'POST',
        body: data,
      })
      .then(res => res.text())
      .then(path => {
        // For async function, we must change state before restore focus ?? Why ?
        insertToCurrent(this.inputRef, this.props.onValueChange, `![img](/upload/image/${path})`);
      });
    }
  }

  onValueChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onValueChange(event.target.value);
  }

  render() {
    const { classes } = this.props;
    const {isPreview, previewContent} = this.state;
    return (
      <Grid className={classes.root} container={true}>
        <Grid item={true} xs={true}>
          <Divider />
          {
            isPreview ? (
              <IconButton color="inherit" aria-label="edit" onClick={this.editClick}>
                <Icon>edit</Icon>
              </IconButton>
            ) : (
              <IconButton color="inherit" aria-label="preview" onClick={this.previewClick} disabled={isPreview}>
                <Icon>remove_red_eye</Icon>
              </IconButton>
            )
          }
          <IconButton color="inherit" aria-label="title" onClick={this.titleClick} disabled={isPreview}>
            <Icon>title</Icon>
          </IconButton>
          <IconButton color="inherit" aria-label="format bold" onClick={this.boldClick} disabled={isPreview}>
            <Icon>format_bold</Icon>
          </IconButton>
          <IconButton color="inherit" aria-label="format italic" onClick={this.italicClick} disabled={isPreview}>
            <Icon>format_italic</Icon>
          </IconButton>
          <IconButton color="inherit" aria-label="code" onClick={this.codeClick} disabled={isPreview}>
            <Icon>code</Icon>
          </IconButton>
          <IconButton color="inherit" aria-label="insert link" onClick={this.linkClick} disabled={isPreview}>
            <Icon>insert_link</Icon>
          </IconButton>
          <IconButton color="inherit" aria-label="format list bulleted" onClick={this.unOrderListClick} disabled={isPreview}>
            <Icon>format_list_bulleted</Icon>
          </IconButton>
          <IconButton color="inherit" aria-label="format list numbered" onClick={this.orderedListClick} disabled={isPreview}>
            <Icon>format_list_numbered</Icon>
          </IconButton>
          <IconButton color="inherit" aria-label="insert photo" onClick={this.photoClick} disabled={isPreview}>
            <Icon>insert_photo</Icon>
          </IconButton>
          <Divider />
          <Dropzone
            accept="image/jpeg, image/png, image/gif"
            className={classes.dropzone}
            disabled={isPreview}
            onDrop={this.onDropFile}
            maxSize={5242880} >
            <Typography style={{ cursor: 'pointer' }}>
              {T.editor.uploadDescription}
            </Typography>
          </Dropzone>
          <Divider />
        </Grid>
        {
          isPreview ? (
            <FormControl fullWidth={true}>
              <Cooked content={previewContent} />
            </FormControl>
          ) : (
            <TextField
              inputRef={this.setRef}
              fullWidth={true}
              multiline={true}
              rows={4}
              rowsMax={20}
              value={this.props.content}
              onChange={this.onValueChangeEvent}
              margin="normal"
            />
          )
        }
      </Grid>
    );
  }
}

export default withStyles(styles)<EditorProps>(Editor);