/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

const en = {
  locale: 'en',

  loading: 'Loading...',

  latest: 'Latest',
  newest: 'Newest',
  top: 'Top',
  posts: 'Posts',
  topics: 'Topics',

  createAt: ' created ',
  lastReplyAt: ' replied ',

  signIn: {
    T: 'Sign In',
    forgotPassword: 'FORGOT PASSWORD?',
    createAccount: 'Create Account',
    signInWithThirdPartService: 'Login with third pard service',
    badCredential: 'Invalid login or password.',
  },
  signUp: {
    T: 'Sign Up',
    conflict: {
      username: 'username already exists!',
      email: 'email already exists!',
      nickname: 'nickname already exists!',
    }
  },

  form: {
    required: 'Required',
    login: 'login',
    loginPlaceHolder: 'email or username',
    password: 'password',
    passwordPlaceHolder: 'password',
    rememberMeLabel: 'Remember Me',
    email: 'email',
    username: 'username',
    usernamePlaceHolder: 'letter, number or underscore',
    nickname: 'nickname',
    nicknamePlaceHolder: 'nickname',
    confirmPassword: 'confirm Password',
    confirmPasswordPlaceHolder: 'confirm Password',
    invalidLogin: 'Invalid login',
    invalidPassword: 'Invalid password',
    invalidEmail: 'Invalid email',
    invalidUsername: 'Invalid username',
    invalidNickname: 'Invalid nickname',
    invalidConfirmPassword: 'Invalid confirmPassword',
  },

  verifyEmailWillSend: 'Verify mail will send to %s',

  loadMore: 'Load More',
  createPost: {
    T: 'Create Post',
    contentEmpty: 'content should not be empty',
  },
  createTopic: {
    title: 'Title',
    category: 'Category',
    submit: 'Send',
    invalidFormData: 'categoryId, title, content should not be empty',
  },
  editor: {
    uploadDescription: 'Try dropping some files here, or click to select files to upload',
  },
  notification: {
    T: 'Notification',
    type: {
      mention: 'mentioned you',
      reply: 'replied to your topic',
    }
  },

  pageNotFound: 'Page Not Found',

  search: {
    T: 'Search',
    resultTitle: 'Search Result',
    in: '%s',
    postAt: 'post at %s',
    totalRecords: '%d records in total',
  },

  setting: {
    T: 'Setting',
    account: {
      T: 'Account',
      changeAvatar: 'Change Avatar',
      changePassword: 'Change Password',
      publicEmail: 'Public Email',
    },
    general: {
      T: 'General',
      changeLanguage: 'Change Language',
    }
  },

  sidebar: {
    home: 'Home',
    feature: 'Feature',
    categories: 'Categories',
    profile: 'Profile',
    logout: 'Log Out',
  },

  snackbars: {
    verifyEmail: 'Verify your email',
    sendEmailTooFrequently: 'Only one email can be sent in one minute!!',
  },

  timeAgo: {
    year: ' years ago',
    month: ' months ago',
    day: ' days ago',
    hour: ' hours ago',
    minute: ' minutes ago',
    second: ' seconds ago',
  }
};

export default en;