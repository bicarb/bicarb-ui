/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

import { Theme } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import * as hljs from 'highlight.js';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';

interface CookedProps {
  content: string;
}

interface CookedState {}

const styles = (theme: Theme) => ({
  container: {
    ...theme.typography.body1,
    fontSize: '0.95rem',
    wordWrap: 'break-word' as 'break-word',
    color: 'inherit' as 'inherit',
    '& img': {
      maxWidth: '100%',
    },
    '& a': {
      color: '#0366d6',
      textDecoration: 'none',
      backgroundColor: 'transparent',
      '&:hover': {
        textDecoration: 'underline',
      },
      '&.user-link': {
        fontWeight: 'bold' as 'bold',
        color: 'inherit',
        whiteSpace: 'nowrap' as 'nowrap',
      },
    },
    '& code': {
      padding: '0.5em',
      color: '#333',
      background: '#f8f8f8',
      borderRadius: 3,
    },
    '& pre code': {
      display: 'block' as 'block',
      overflowX: 'auto' as 'auto',
      padding: theme.spacing.unit * 2,
    },
    '& blockquote': {
      margin: 0,
      color: theme.typography.caption.color,
      borderLeft: '0.25em solid #dfe2e5',
      padding: '0 1em',
    },
    '& ul, ol': {
      paddingLeft: '1.5rem',
    },
    '& .task-list-item': {
      listStyle: 'none',
    },
    '& iframe': {
      maxWidth: '100%',
    },
    '& table': {
      fontFamily: theme.typography.fontFamily,
      width: '100%',
      display: 'table' as 'table',
      borderSpacing: 0,
      borderCollapse: 'collapse' as 'collapse',
      '& thead': {
        display: 'table-header-group',
        '& tr': {
          height: 56,
        },
      },
      '& body': {
        display: 'table-row-group',
      },
      '& tr': {
        color: 'inherit',
        height: 48,
        display: 'table-row',
        outline: 'none',
        verticalAlign: 'middle',
      },
      '& th, td': {
        display: 'table-cell',
        padding: 4,
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
      },
      '& th': {
        color: theme.palette.text.secondary,
        fontWeight: theme.typography.fontWeightMedium,
      },
      '& td': {
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
  },
});

interface Styles { classes: { [className in keyof ReturnType<typeof styles>]: string }; theme: Theme; }

type Props = CookedProps & Styles & RouteComponentProps<{}>;

class Cooked extends React.PureComponent<Props, CookedState> {
  ref: HTMLDivElement;

  setRef = (ref: HTMLDivElement) => {
    this.ref = ref;
  }

  highlightCode = () => {
    if (!this.ref) { return; }

    const blocks = this.ref.querySelectorAll('pre code');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      hljs.highlightBlock(block);
    }
  }

  onUserLinkClick = (event: Event) => {
    event.preventDefault();
    this.props.history.push(`/user/${(event.target as HTMLAnchorElement).text.trim().substr(1)}`);
  }

  interceptUserLink = () => {
    if (!this.ref) { return; }

    const as = this.ref.querySelectorAll('a.user-link');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < as.length; i++) {
      const a = as[i];
      a.removeEventListener('click', this.onUserLinkClick);
      a.addEventListener('click', this.onUserLinkClick);
    }
  }

  componentDidMount () {
    window.setTimeout(() => {
      this.highlightCode();
      this.interceptUserLink();
    }, 300);
  }

  componentDidUpdate () {
    window.setTimeout(() => {
      this.highlightCode();
      this.interceptUserLink();
    }, 300);
  }

  render() {
    const { classes, content } = this.props;
    return (
      <div
        ref={this.setRef}
        className={classes.container}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }
}

export default compose<CookedProps, CookedProps>(
  withStyles(styles, { withTheme: true }),
  withRouter,
)(Cooked);