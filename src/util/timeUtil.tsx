/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import T from '../i18n';

export function timeSince(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval + T.timeAgo.year;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + T.timeAgo.month;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + T.timeAgo.day;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + T.timeAgo.hour;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + T.timeAgo.minute;
  }

  return Math.floor(seconds) + T.timeAgo.second;
}
