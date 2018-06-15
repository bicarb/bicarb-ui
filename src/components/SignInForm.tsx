/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { Theme, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { Field, FormErrors, FormSubmitHandler, InjectedFormProps, reduxForm, SubmissionError } from 'redux-form';
import { postLogin } from '../api';
import { VALID_EMAIL, VALID_PASSWORD, VALID_USERNAME } from '../constants/regex';
import T from '../i18n';
import { CheckboxWrapped, TextFieldWrapped } from './common/FormWapper';

export interface SignInFormProps {
  onClose: () => void;
}

interface SignInFormState {}

export interface SignInFormData {
  login: string;
  password: string;
  rememberMe: boolean;
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

type Props = SignInFormProps & Styles & InjectedFormProps<SignInFormData, SignInFormProps>;

class SignInForm extends React.Component<Props, SignInFormState> {

  handleSignInSubmit: FormSubmitHandler<SignInFormData, SignInFormProps> = (values) => {
    return postLogin(values.login, values.password, values.rememberMe).then(res => {
      if (res.status === 200) {
        location.reload();
      } else {
        throw new SubmissionError({
          _error: T.signIn.badCredential,
        });
      }
    });
  }

  render() {
    const { classes, onClose } = this.props;
    const { handleSubmit, error } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSignInSubmit)}>
        <Toolbar>
          <IconButton onClick={onClose} className={classes.leftButton}>
            <Icon>arrow_back</Icon>
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {T.signIn.T}
          </Typography>
          <IconButton type="submit" className={classes.rightButton}>
            <Icon>done</Icon>
          </IconButton>
        </Toolbar>
        <DialogContent>
          <DialogContentText>
            {/* to continue */}
            {error && <strong>{error}</strong>}
          </DialogContentText>
          <Field
            component={TextFieldWrapped}
            name="login"
            label={T.form.login}
            margin="dense"
            placeholder={T.form.loginPlaceHolder}
            autoFocus={true}
            fullWidth={true}
          />
          <Field
            component={TextFieldWrapped}
            name="password"
            label={T.form.password}
            type="password"
            margin="dense"
            placeholder={T.form.passwordPlaceHolder}
            fullWidth={true}
          />
          <FormControlLabel
            control={
              <Field 
                name="rememberMe"
                label="rememberMe"
                component={CheckboxWrapped}
              />
            }
            label={T.form.rememberMeLabel}
          />
          {/*
          <br />
          <div style={{ textAlign: 'center', paddingBottom: 8 }}>
            <Button color="primary">{T.signIn.forgotPassword}</Button>
            <Button color="primary">{T.signIn.createAccount}</Button>
          </div>
          <Divider />
          <div style={{ textAlign: 'center', paddingTop: 8 }}>
            <Typography>{T.signIn.signInWithThirdPartService}</Typography>
          </div>
          */}
        </DialogContent>
      </form>
    );
  }
}

const validate = (values: SignInFormData): FormErrors<SignInFormData> => {
  const errors: FormErrors<SignInFormData> = {};
  const { login, password } = values;
  if (!VALID_EMAIL.test(login) && !VALID_USERNAME.test(login)) { errors.login = T.form.invalidLogin; }
  if (!VALID_PASSWORD.test(password)) { errors.password = T.form.invalidPassword; }

  if (!login) { errors.login = T.form.required; }
  if (!password) { errors.password = T.form.required; }
  return errors;
};

export default reduxForm<SignInFormData, SignInFormProps>({
  form: 'SignInForm',
  validate,
})(withStyles(styles)(SignInForm));