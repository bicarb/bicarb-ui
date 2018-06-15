/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';

export const TextFieldWrapped = (props: any) => {
  const {
    input,
    label,
    meta: { touched, error },
    ...custom
  } = props;
  return (
    <TextField
      label={label}
      error={touched && !!error}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  );
};

export const CheckboxWrapped = ({ input, label }: any) => (
  <Checkbox
    checked={!!input.value}
    onChange={input.onChange}
    value={label}
  />
);
