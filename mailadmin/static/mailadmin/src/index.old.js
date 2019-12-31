/* global moment, _, $, queryString, nunjucks, notify */

import { parseEmails, setQueryString } from './utils';

const API_URL = {
  ALIASES: '/api/aliases/',
  OU_LIST: '/api/orgunits/',
  ME: '/api/me/',
  EMAIL_DOMAIN: '/api/emaildomain/'
};
let csrfToken;

function filterLists(queryTerm, withMembers) {
  const lists = $('.fwdlist').not('.new-list');
  if ($.trim(queryTerm) === '') {
    $(lists)
      .find('.alias-row')
      .removeClass('highlight');
    $(lists).removeClass('hidden');
    return;
  }

  /* Filter lists */
  const reTerm = new RegExp(queryTerm);
  lists.each(function() {
    const listName = $(this).attr('data-list-name');
    const members = $(this).find('.js-destination');
    let hits = 0;
    if (withMembers) {
      hits = _.filter(members, function(el) {
        const matches = reTerm.test($(el).text());
        if (matches) {
          $(el)
            .parent()
            .parent()
            .addClass('highlight');
        } else {
          $(el)
            .parent()
            .parent()
            .removeClass('highlight');
        }
        return matches;
      });
    } else {
      $('.alias-row').removeClass('highlight');
    }

    if (reTerm.test(listName) || (hits.length !== 0 && withMembers)) {
      $(this).removeClass('hidden');
    } else {
      $(this).addClass('hidden');
    }
  });
}

function filterListsByOrgUnit(id, prefix) {
  if (!prefix) {
    prefix = $(`.orgunit-list a[data-id="${id}"]`).attr('data-prefix');
  }
  // eslint-disable-next-line no-use-before-define
  setActiveOrgUnit(id);
  filterLists(prefix);
  let queryParams = { orgunit: id };
  if (id === '') {
    queryParams = null;
  }
  setQueryString(queryParams);
}

function updateNumEmails(event) {
  const el = $(event.target);
  const emails = parseEmails(el.val());
  const listName = el.attr('data-list-name');
  const counter = $(`.fwdlist[data-list-name="${listName}"] .email-counter`);

  if (emails.length > 0) {
    counter.text(emails.length);
  } else {
    counter.text('');
  }
}
function createAliases(newAliases, onSuccess, onError) {
  $.ajax({
    url: API_URL.ALIASES,
    type: 'POST',
    headers: { 'X-CSRFToken': csrfToken },
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(newAliases),
    success: onSuccess,
    error: onError
  });
}
function setActiveOrgUnit(id) {
  /* Reset active */
  $('.orgunit-list li').removeClass('active');

  /* Set current */
  const orgUnit = $(`.orgunit-list li a[data-id="${id}"]`);
  orgUnit.parent().toggleClass('active');
  $('.orgunits-select').val(id); // <select>

  /* Reset search field */
  $('.js-lists-filter-field').val('');
}
function setPrefixesRegex(ous) {
  ous = _.map(ous, function(ou) {
    const prefixes = _.map(ou.prefixes, function(prefix) {
      return `^${prefix}-|^${prefix}@`;
    });
    ou.prefixes_regex = prefixes.join('|');

    return ou;
  });

  return ous;
}
function resetActiveOrgUnit() {
  $('.orgunit-list li').removeClass('active');
  $('.orgunit-list li:first-child').toggleClass('active');
}

$(document).ready(function() {
  csrfToken = $('meta[name=x-csrf-token]').attr('content');
  const forwardsContainer = $('.forwards-container');
  nunjucks.configure({ autoescape: true });
  moment.locale('nb');
  /* Add filter |datefromnow and |date to nunjucks */
  const nunjucksEnv = new nunjucks.Environment();

  nunjucksEnv.addFilter('datefromnow', function(str) {
    return moment(str).fromNow();
  });

  nunjucksEnv.addFilter('date', function(str, strformat) {
    return moment(str).format(strformat);
  });

  /* Lists view (home) */
  if ($('body.home').length) {
    $('.js-lists-filter-field').focus();
    /* Load orgunits */
    $.getJSON(API_URL.OU_LIST, function(data) {
      data = setPrefixesRegex(data);

      const ouHtml = nunjucksEnv.render('orgunits.html', { orgunits: data });
      $('.orgunit-list').append(ouHtml);
      const ousHtml = nunjucksEnv.render('orgunits_select.html', { orgunits: data });
      $('.orgunit-select-container').html(ousHtml);

      /* If searching then set q */
      const qs = queryString.parse(window.location.search);
      if (qs.q) {
        resetActiveOrgUnit();
        $('.js-lists-filter-field').val(qs.q);
      }
      if (qs.orgunit) {
        setActiveOrgUnit(qs.orgunit);
      }

      /* Load email domain */
      $.getJSON(API_URL.EMAIL_DOMAIN, function(emailDomain) {
        emailDomain = emailDomain.domain;

        /* New list */
        const newListHtml = nunjucksEnv.render('new_list.html', {
          orgunits: data,
          api_urls: API_URL,
          email_domain: emailDomain
        });
        $('.new-list').html(newListHtml);

        /* New list: List name (source) */
        $('.new-list .js-new-list-name').on('keyup', function() {
          let newListName = $('.new-list .js-new-list-name')
            .val()
            .trim();
          if (newListName === '') {
            $('.js-new-list-preview').html('Ny liste');
            return;
          }
          const prefix = $('.new-list .prefix-select .active').attr('data-value');
          const source = `${prefix + newListName}@${emailDomain.name}`;
          let labelHtml = '<span class="label label-success">Ny</span> ';
          const existingList = $(`.fwdlist[data-list-name="${source}"]`).length;

          if (existingList) {
            labelHtml = '<span class="label label-primary">Eksisterende</span> ';
          }

          newListName = labelHtml + source;
          $('.js-new-list-preview').html(newListName);
        });

        /* New list: Select prefix */
        $('.new-list .prefix-select a').on('click', function() {
          $('.new-list .prefix-select a')
            .parent()
            .removeClass('active');
          $(this)
            .parent()
            .addClass('active');
          const prefix = $(this)
            .parent()
            .attr('data-value');
          $('.new-list .prefix-btn').html(`${prefix} <span class="caret"></span>`);
        });

        $('.new-list textarea').on('keyup', updateNumEmails);

        /* New list: Add list with aliases */
        $('.js-add-list').on('click', function(e) {
          e.preventDefault();
          /* Validate */
          const newListName = $('.new-list .js-new-list-name').val();
          if (newListName.length === 0) {
            notify('Ny epostliste', 'Navn på epostliste mangler', 'error');
            return;
          }
          const text = $('.new-list textarea').val();
          const emails = parseEmails(text);
          if (emails.length === 0) {
            notify('Ny epostliste', 'Ingen eposter i epost-feltet...', 'error');
            return;
          }
          // Valid form
          const prefix = $('.new-list .prefix-select .active').attr('data-value');
          const source = `${prefix + newListName}@${emailDomain.name}`;

          const newAliases = _.map(emails, function(el) {
            return {
              source,
              destination: el,
              domain: emailDomain.id
            };
          });

          createAliases(
            newAliases,
            function(aliases) {
              $('.new-list textarea').val('');
              $('.new-list .js-new-list-name').val('');
              $('.js-new-list-preview').html('Ny liste');
              $('.new-list .email-counter').html('');
              const listName = aliases[0].source;
              const listEl = $(`.fwdlist[data-list-name="${listName}"]`);

              if (listEl.length) {
                /* Append to existing list */
                notify('Oppdatert', `Oppdatert: ${listName} er oppdatert`, 'success');
                const listHtml = nunjucksEnv.render('aliases.html', { aliases });
                listEl
                  .find('tbody .alias-row')
                  .last()
                  .after(listHtml);
                return;
              }

              /* Add new list on top */
              notify('Lagt til', `Ny liste: ${listName} lagt til`, 'success');
              const newList = _.groupBy(aliases, function(alias) {
                return alias.source;
              });
              const addedListHtml = nunjucksEnv.render('list.html', { lists: newList });
              forwardsContainer.prepend(addedListHtml);
            },
            function(xhr) {
              const error = xhr.responseJSON;
              const msg = error && error[0].non_field_errors ? error[0].non_field_errors[0] : '';
              notify('Ikke oppdatert', `Kunne ikke legge til nye eposter.\n${msg}`, 'error');
            }
          );
        });

        /* Filter lists by orgunit */
        $('.orgunit-list a').on('click', function(e) {
          e.preventDefault();
          const id = $(this).attr('data-id');
          const prefix = $(this).attr('data-prefix');
          filterListsByOrgUnit(id, prefix);
        });
        $('.orgunits-select').on('change', function() {
          const id = $(this).val();
          const prefix = $(this)
            .find(':selected')
            .attr('data-prefix');
          filterListsByOrgUnit(id, prefix);
        });
      });
    });

    /* Load forwards from API and put on page */
    $.getJSON(API_URL.ALIASES, function(data) {
      let errMsg;
      if (data && data.length === 0) {
        errMsg = 'Fant ingen tilhørende lister';
        notify('Ingen lister.', errMsg, 'info');
        forwardsContainer.html(errMsg);
        return;
      }
      if (data && 'error' in data) {
        errMsg = `Klarte ikke hente epostlister fra APIet: ${data.error}`;
        notify('Oops!', errMsg, 'error');
        forwardsContainer.html(errMsg);
        return;
      }

      let lists = _.sortBy(data, function(alias) {
        return alias.source;
      });
      lists = _.groupBy(lists, function(alias) {
        return alias.source;
      });
      const fwHtml = nunjucksEnv.render('list.html', { lists });

      forwardsContainer.html(fwHtml);

      /* Filter lists by search term from query string */
      const qs = queryString.parse(window.location.search);
      if (qs.q) {
        filterLists(qs.q, true);
      } else if (qs.orgunit) {
        filterListsByOrgUnit(qs.orgunit);
      }
    });

    /* Mark row red for deletion and show delete button if applicable */
    forwardsContainer.on('click', '[name=fwd-delete]', function() {
      $(this)
        .parent()
        .parent()
        .parent()
        .toggleClass('danger');
      const tbody = $(this).closest('tbody');
      const numSelected = tbody.find('[name=fwd-delete]:checked').length;
      if (numSelected > 0) {
        tbody.find('.link-del').addClass('visible');
      } else {
        tbody.find('.link-del').removeClass('visible');
      }
    });

    /* Delete selected aliases */
    forwardsContainer.on('click', '.js-del-selected', function() {
      const listName = $(this).attr('data-delete-list-name');
      const listEl = $(`.fwdlist[data-list-name="${listName}"]`);
      const checked = listEl.find('[name="fwd-delete"]:checked');

      const deleteThese = _.map(checked, function(el) {
        return {
          source: $(el).attr('data-source'),
          destination: $(el).attr('data-destination'),
          domain: parseInt($(el).attr('data-domain'), 10)
        };
      });
      function success() {
        const checkedFormatted = _.map(deleteThese, function(el) {
          return el.destination;
        }).join(', ');
        checked.closest('tr').remove();
        /* remove list if no more rows */
        if (listEl.find('.alias-row').length === 0) {
          listEl.remove();
        }
        listEl.find('.link-del').removeClass('visible');
        notify('Slettet', checkedFormatted, 'success');
      }
      function error(res) {
        notify('Kunne ikke slette', res.detail, 'error');
      }
      const data = {
        type: 'DELETE',
        headers: { 'X-CSRFToken': csrfToken },
        url: API_URL.ALIASES,
        data: JSON.stringify(deleteThese),
        contentType: 'application/json; charset=utf-8',
        success,
        error
      };
      $.ajax(data);
    });

    /* Toggle button for add emails textarea */
    forwardsContainer.on('click', '.js-toggle-email-textarea', function(e) {
      e.preventDefault();
      const row = $(this)
        .closest('tbody')
        .find('.textarea-row');
      row.toggleClass('visible');

      $(this)
        .closest('tbody')
        .find('textarea')
        .focus();
    });

    /* Add emails to current list */
    forwardsContainer.on('click', '.js-new-email', function(e) {
      e.preventDefault();
      const source = $(this).attr('data-list-name');
      const textarea = $(`textarea[data-list-name="${source}"]`);
      const emails = parseEmails(textarea.val());
      if (emails.length === 0) {
        notify('Ny epostliste', 'Ingen eposter i epost-feltet...', 'error');
        return;
      }
      const listEl = $(`.fwdlist[data-list-name="${source}"]`);
      const newAliases = _.map(emails, function(el) {
        return {
          source,
          destination: el,
          domain: parseInt(listEl.attr('data-domain'), 10)
        };
      });

      createAliases(
        newAliases,
        function(aliases) {
          const aliasesFormatted = _.map(aliases, function(el) {
            return el.destination;
          }).join(', ');
          notify(`Oppdatert ${aliases[0].source}`, `La til epostene: ${aliasesFormatted}.`, 'success');
          textarea.val('');
          listEl.find('.email-counter').text('');
          /* Append to existing list */
          const addedListHtml = nunjucksEnv.render('aliases.html', { aliases });
          listEl
            .find('tbody .alias-row')
            .last()
            .after(addedListHtml);
        },
        function(xhr) {
          const error = xhr.responseJSON;
          const msg = error && error[0].non_field_errors ? error[0].non_field_errors[0] : '';
          notify('Ikke oppdatert', `Kunne ikke legge til nye eposter.\n${msg}`, 'error');
        }
      );
    });

    /* Update num emails for all list textarea's */
    forwardsContainer.on('keyup', '.js-add-list-textarea, .new-list textarea', updateNumEmails);

    /* Filter by search query */
    $('.js-lists-filter-field').on('keyup change', function() {
      const term = $(this).val();
      filterLists(term, true);
      resetActiveOrgUnit();
      let queryParams = { q: term };
      if (term === '') {
        queryParams = null;
      }
      setQueryString(queryParams);
    });

    /* New list toggle display button */
    $('.new-list-btn').on('click', function() {
      $('.new-list').toggleClass('visible');
    });
  }
});
