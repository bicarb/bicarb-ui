/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { Theme, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Field, FormErrors, FormSubmitHandler, InjectedFormProps, reduxForm, SubmissionError } from 'redux-form';
import { createUser, postLogin } from '../api';
import { VALID_EMAIL, VALID_NICKNAME, VALID_PASSWORD, VALID_USERNAME } from '../constants/regex';
import T from '../i18n';
import logger from '../util/logger';
import { TextFieldWrapped } from './common/FormWapper';

export interface SignUpFormProps {
  onClose: () => void;
}

interface SignUpFormState {}

export interface SignUpFormData {
  email: string;
  username: string;
  nickname: string;
  password: string;
  confirmPassword: string;
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

type Props = SignUpFormProps & Styles & InjectedFormProps<SignUpFormData, SignUpFormProps>;

class SignUpForm extends React.Component<Props, SignUpFormState> {

  handleSignUpSubmit: FormSubmitHandler<SignUpFormData, SignUpFormProps> = ({email, username, nickname, password}) => {
    return createUser(email, username, nickname, password)
      .then(res => {
        logger.trace(res);
        if (res.status === 201) {
          // success -> auto login
          return postLogin(username, password, true).then(() => location.reload());
        } else if (res.status === 409) {
          // conflict
          return res.json().then(json => {
            const errors: FormErrors<SignUpFormData> = {};
            json.errors.forEach(({code}: {code: string}) => {
              switch (code) {
                case '4091':
                  errors.username = T.signUp.conflict.username;
                  break;
                case '4092':
                  errors.email = T.signUp.conflict.email;
                  break;
                case '4093':
                  errors.nickname = T.signUp.conflict.nickname;
                  break;
                default:
                  break;
              }
            });
            throw new SubmissionError(errors);
          });
        } else {
          // what's wrong !?
          throw new SubmissionError({
            _error: 'Unknown Error!!',
          });
        }
      });
  }

  render() {
    const { classes, handleSubmit, onClose } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSignUpSubmit)}>
        <Toolbar>
          <IconButton onClick={onClose} className={classes.leftButton}>
            <Icon>arrow_back</Icon>
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {T.signUp.T}
          </Typography>
          <IconButton type="submit" className={classes.rightButton}>
            <Icon>done</Icon>
          </IconButton>
        </Toolbar>
        <DialogContent>
          <Field 
            component={TextFieldWrapped}
            name="email"
            label={T.form.email}
            margin="dense"
            autoFocus={true}
            fullWidth={true}
            placeholder={T.form.email}
          />
          <Field 
            component={TextFieldWrapped}
            name="username"
            label={T.form.username}
            margin="dense"
            fullWidth={true}
            placeholder={T.form.usernamePlaceHolder}
          />
          <Field 
            component={TextFieldWrapped}
            name="nickname"
            label={T.form.nickname}
            margin="dense"
            fullWidth={true}
            placeholder={T.form.nicknamePlaceHolder}
          />
          <Field 
            component={TextFieldWrapped}
            name="password"
            label={T.form.password}
            type="password"
            margin="dense"
            fullWidth={true}
            placeholder={T.form.passwordPlaceHolder}
          />
          <Field
            component={TextFieldWrapped}
            name="confirmPassword"
            label={T.form.confirmPassword}
            type="password"
            margin="dense"
            fullWidth={true}
            placeholder={T.form.confirmPasswordPlaceHolder}
          />
        </DialogContent>
      </form>
    );
  }
}

const validate = (values: SignUpFormData): FormErrors<SignUpFormData> => {
  const errors: FormErrors<SignUpFormData> = {};
  const { email, username, nickname, password, confirmPassword } = values;
  if (!VALID_EMAIL.test(email)) { errors.email = T.form.invalidEmail; }
  if (!VALID_USERNAME.test(username)) { errors.username = T.form.invalidUsername; }
  if (!VALID_NICKNAME.test(nickname)) { errors.nickname = T.form.invalidNickname; }
  if (!VALID_PASSWORD.test(password)) { errors.password = T.form.invalidPassword; }
  if (password !== confirmPassword) { errors.confirmPassword = T.form.invalidConfirmPassword; }

  if (!email) { errors.email = T.form.required; }
  if (!username) { errors.username = T.form.required; }
  if (!nickname) { errors.nickname = T.form.required; }
  if (!password) { errors.password = T.form.required; }
  if (!confirmPassword) { errors.confirmPassword = T.form.required; }
  return errors;
};

export default reduxForm<SignUpFormData, SignUpFormProps>({
  form: 'SignUpForm',
  validate,
})(withStyles(styles)(SignUpForm));