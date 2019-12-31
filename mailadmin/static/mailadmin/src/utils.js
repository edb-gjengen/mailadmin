/* global _ */

import PNotify from 'pnotify/dist/es/PNotify';
import * as queryString from 'query-string';

export function parseEmails(text) {
  if (text === undefined || text === '') {
    return [];
  }
  /* Get each word from the text, split by spaces, end line, semicolon, quotes, commas, colons, parens and brackets. */
  const words = text.split(/[\s\n;"',;:()<>[\]\\]+/);

  // Regex for identifying an email address.
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // For each of the words, add to the array of emails if the word matches the email regex.
  let emails = _.filter(words, (word) => {
    return word.match(re);
  });
  emails = _.map(emails, (el) => {
    return el.toLowerCase();
  });

  return _.unique(emails);
}

export function setQueryString(obj) {
  let qs = '';
  if (obj) {
    qs = `?${queryString.stringify(obj)}`;
  }
  window.history.pushState(null, null, `/lists/${qs}`);
}

export function notify(title, text, type) {
  /* types: info, success, error */
  return new PNotify({
    title,
    text,
    type,
    delay: 3000,
    animate_speed: 'fast',
    styling: 'bootstrap4'
  });
}
