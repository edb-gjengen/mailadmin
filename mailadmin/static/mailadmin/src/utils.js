import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
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
  const emails = words
    .filter((word) => {
      return word.match(re);
    })
    .map((el) => {
      return el.toLowerCase();
    });

  return [...new Set(emails)];
}

export function setQueryString(obj) {
  let qs = '';
  if (obj) {
    qs = `?${queryString.stringify(obj)}`;
  }
  window.history.pushState(null, null, `/lists/${qs}`);
}

/**
 * @param {string} title
 * @param {string} text
 * @param {('info'|'success'|'error')} type
 * */
export function notify(title, text, type = 'success') {
  PNotify.alert({
    title,
    text,
    type,
    delay: 3000,
    animate_speed: 'fast',
    styling: 'bootstrap4'
  });
}

export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
