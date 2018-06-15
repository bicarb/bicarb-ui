/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

const zhCN = {
  locale: 'zh-CN',

  loading: '载入中...',

  latest: '最新回复',
  newest: '最新发布',
  top: '热门话题',
  posts: '回复',
  topics: '话题',

  createAt: ' 发表于 ',
  lastReplyAt: ' 回复于 ',

  signIn: {
    T: '登录',
    forgotPassword: '忘记密码？',
    createAccount: '注册账号',
    signInWithThirdPartService: '使用第三方账号登录',
    badCredential: '错误的用户名/邮箱或密码',
  },
  signUp: {
    T: '注册',
    conflict: {
      username: '该用户名已存在',
      email: '该邮箱已存在',
      nickname: '该昵称已存在',
    }
  },

  form: {
    required: '该项不可为空',
    login: '邮箱或用户名',
    loginPlaceHolder: '邮箱或用户名',
    password: '密码',
    passwordPlaceHolder: '密码',
    rememberMeLabel: '记住我',
    email: '邮箱',
    username: '用户名',
    usernamePlaceHolder: '字母，数字，下划线组成',
    nickname: '昵称',
    nicknamePlaceHolder: '昵称',
    confirmPassword: '请再次输入密码',
    confirmPasswordPlaceHolder: '请再次输入密码',
    invalidLogin: '无效的用户名或邮箱',
    invalidPassword: '无效的密码',
    invalidEmail: '无效的邮箱',
    invalidUsername: '无效的用户名',
    invalidNickname: '无效的昵称',
    invalidConfirmPassword: '两次输入的密码不一致',
  },

  verifyEmailWillSend: '验证邮件将发往 %s',

  loadMore: '载入更多',
  createPost: {
    T: '新建回复',
    contentEmpty: '内容不允许为空',
  },
  createTopic: {
    title: '标题',
    category: '分类',
    submit: '发送',
    invalidFormData: '分类，标题，内容不允许为空',
  },
  editor: {
    uploadDescription: '将文件拖至该处或点击此处上传文件',
  },
  notification: {
    T: '通知',
    type: {
      mention: '提到你',
      reply: '回复了你的话题',
    }
  },

  pageNotFound: '找不到页面',

  search: {
    T: '搜索',
    resultTitle: '搜索结果',
    in: '%s',
    postAt: '发表于 %s',
    totalRecords: '共计 %d 项',
  },

  setting: {
    T: '设置',
    account: {
      T: '账户',
      changeAvatar: '修改头像',
      changePassword: '修改密码',
      publicEmail: '公开邮箱',
    },
    general: {
      T: '通用',
      changeLanguage: '修改语言',
    }
  },

  sidebar: {
    home: '主页',
    feature: '精华',
    categories: '分类',
    profile: '我的',
    logout: '登出',
  },

  snackbars: {
    verifyEmail: '验证你的邮箱',
    sendEmailTooFrequently: '一分钟内只能发送一封邮件！！',
  },

  timeAgo: {
    year: ' 年前',
    month: ' 个月前',
    day: ' 天前',
    hour: ' 小时前',
    minute: ' 分钟前',
    second: ' 秒前',
  }
};

export default zhCN;