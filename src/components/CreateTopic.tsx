/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Paper from '@material-ui/core/Paper';
import { Theme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as classNames from 'classnames';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { postCreateTopic } from '../api';
import G from '../global';
import T from '../i18n';
import Editor from './Editor';

interface CreateTopicProps {}

interface CreateTopicState {
  categoryId: string;
  title: string;
  content: string;
  isCreating: boolean;
}

const styles = (theme: Theme) => ({
  fieldSet: {
    padding: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  categoryField: {
    minWidth: 96,
  },
  menu: {
    minWidth: 96,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

interface ClassNames { classes: { [className in keyof ReturnType<typeof styles>]: string }; }

type Props = CreateTopicProps & ClassNames & RouteComponentProps<{}>;

class CreateTopic extends React.Component<Props, CreateTopicState> {

  constructor(props: Props) {
    super(props);
    this.state = {
      categoryId: '',
      title: '',
      content: '',
      isCreating: false,
    };
  }

  onSendClick = () => {
    const {categoryId, title, content} = this.state;
    if (categoryId === '' || title === '' || content === '') {
      alert(T.createTopic.invalidFormData);
    } else {
      this.setState({ isCreating: true });
      postCreateTopic(categoryId, title, content).then(res => {
        this.setState({ isCreating: false });
        if (res.status === 201) {
          return res.json().then(json => {
            this.props.history.replace(`/topic/${json.data.id}/${json.data.attributes.slug}`);
          });
        } else {
          return res.text().then(text => window.alert(text));
        }
      });
    }
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      categoryId: event.target.value,
    });
  }

  handleContentChange = (value: string) => {
    this.setState({
      content: value,
    });
  }

  render() {
    const { classes } = this.props;
    const { content, isCreating } = this.state;
    return (
      <Paper>
        <form noValidate={true} autoComplete="off">
          <Grid container={true}>
            {/* filed set */}
            <Grid className={classes.fieldSet} container={true} item={true}>
              <Grid item={true}>
                <TextField
                  id="select-category"
                  select={true}
                  label={T.createTopic.category}
                  className={classNames(classes.textField, classes.categoryField)}
                  value={this.state.categoryId}
                  onChange={this.handleCategoryChange}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  // helperText="Please select your currency"
                  margin="normal"
                >
                  {G.categories.map(category => String(category.id) !== '0'
                    ? <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    : null
                  )}
                </TextField>
              </Grid>
              <Grid container={true} item={true} xs={true}>
                <TextField
                  label={T.createTopic.title}
                  fullWidth={true}
                  className={classes.textField}
                  onChange={this.handleTitleChange}
                  margin="normal"
                />
              </Grid>
            </Grid>
            {/* editor */}
            <Grid item={true} xs={12}>
              <Editor
                content={content}
                topicBody={true}
                onValueChange={this.handleContentChange} />
            </Grid>
            {/* buttons */}
            <Grid container={true} item={true}>
              <Grid item={true} xs={true} />
              <Grid item={true}>
                <Button
                  className={classes.button}
                  variant="raised"
                  color="primary"
                  onClick={this.onSendClick}
                  disabled={isCreating}
                >
                  {T.createTopic.submit} <Icon className={classes.rightIcon}>send</Icon>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)<CreateTopicProps>(CreateTopic);