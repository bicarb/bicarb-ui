/*
 * Copyright (c) 2018 the original author or authors.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * See LICENSE file in the root directory of this source tree.
 */

export function insertToLineStart(inputRef: HTMLInputElement, setState: (value: string) => void, inserted: string) {
  const value = inputRef.value;
  const cursorStart = inputRef.selectionStart as number;
  const cursorEnd = inputRef.selectionEnd as number;
  const lineStart = _findLineStart(value, cursorStart);
  inputRef.value = value.slice(0, lineStart) + inserted + value.slice(lineStart);

  setState(inputRef.value);
  restoreCursor(inputRef, cursorStart, cursorEnd, inserted.length);
}

export function insertToCurrent(inputRef: HTMLInputElement, setState: (value: string) => void, inserted: string) {
  const value = inputRef.value;
  const cursorStart = inputRef.selectionStart as number;
  const cursorEnd = inputRef.selectionEnd as number;
  inputRef.value = value.slice(0, cursorStart) + inserted + value.slice(cursorStart);

  setState(inputRef.value);
  restoreCursor(inputRef, cursorStart, cursorEnd, inserted.length);
}

/**
 * insertToLineEndOrBothSideForCurrentLineOrSelected.
 * @param {HTMLInputElement} inputRef inputRef
 * @param {(value: string) => void} setState setState before restore focus
 * @param {string} prefix prefix
 * @param {string} suffix suffix
 * @param {string} mp prefix when select multiple line
 * @param {string} ms suffix when select multiple line
 */
export function insertToLineEndOrBothSideForCurrentLineOrSelected(
    inputRef: HTMLInputElement, setState: (value: string) => void, prefix: string, suffix: string, mp?: string, ms?: string) {
  const value = inputRef.value;
  const cursorStart = inputRef.selectionStart as number;
  const cursorEnd = inputRef.selectionEnd as number;
  if (cursorStart === cursorEnd) {
    // unselected
    const lineEnd = _findLineEnd(value, cursorEnd);
    if (cursorEnd === lineEnd) {
      // insertToCurrent
      inputRef.value = value.slice(0, cursorStart) + (prefix + suffix) + value.slice(cursorStart);
    }  else {
      // insertBothSideForCurrentLine
      const lineStart = _findLineStart(value, cursorStart);
      inputRef.value = value.slice(0, lineStart) + prefix +
        value.slice(lineStart, lineEnd) + suffix + value.slice(lineEnd);
    }

    setState(inputRef.value);
    restoreCursor(inputRef, cursorStart, cursorEnd, prefix.length);
  } else {
    // selected
    if (value.slice(cursorStart, cursorEnd).includes('\n')) {
      // insertBothSideForMultipleLineSelected
      inputRef.value = value.slice(0, cursorStart) + (mp ? mp : prefix) +
        value.slice(cursorStart, cursorEnd) + (ms ? ms : suffix) + value.slice(cursorEnd);

      setState(inputRef.value);
      restoreCursor(inputRef, cursorStart, cursorEnd, (mp ? mp : prefix).length);
    }  else {
      // insertBothSideForSelected
      inputRef.value = value.slice(0, cursorStart) + prefix +
        value.slice(cursorStart, cursorEnd) + suffix + value.slice(cursorEnd);

      setState(inputRef.value);
      restoreCursor(inputRef, cursorStart, cursorEnd, prefix.length);
    }
  }
}

function restoreCursor(inputRef: HTMLInputElement, originStart: number, originEnd: number, offset: number) {
  inputRef.focus();
  inputRef.selectionStart = originStart + offset;
  inputRef.selectionEnd = originEnd + offset;
}

/**
 * include.
 */
export function _findLineStart(value: string, cursorStart: number): number {
  let i;
  for (i = cursorStart - 1; i > 0; i--) {
    if (value.charAt(i) === '\n') {
      break;
    }
  }
  if (i !== 0) {
    i += 1;
  }
  return i;
}

/**
 * exclude.
 */
export function _findLineEnd(value: string, cursorEnd: number): number {
  const length = value.length;
  let i;
  for (i = cursorEnd; i < length; i++) {
    if (value.charAt(i) === '\n') {
      break;
    }
  }
  if (i > length) {
    i -= 1;
  }
  return i;
}