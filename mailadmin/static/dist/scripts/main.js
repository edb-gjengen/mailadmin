(function() {
    'use strict';
    /*global moment, jQuery, document, _, $, window, List, queryString */
    var api_urls = {
        aliases: '/api/aliases/',
        ou_list: '/api/orgunits/',
        me: '/api/me/',
        email_domain: '/api/emaildomain/'
    };
    var csrf_token;

    function parseEmails(text) {
        if(text === undefined || text === "") {
            return [];
        }
        /* Get each word from the text, split by spaces, end line, semicolon,
            quotes, commas, colons, parens and brackets. */
        var words = text.split(/[\s\n;"',;:()<>[\]\\]+/);

        // Regex for identifying an email address.
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // For each of the words, add to the array of emails if the word matches the email regex.
        var emails = _.filter(words, function(word) {
            return word.match(re);
        });
        emails = _.map(emails, function(el) {
            return el.toLowerCase();
        });

        return _.unique(emails);
    }

    function setQueryString(obj) {
        var qs = '';
        if(obj !== null) {
            qs = '?' + queryString.stringify(obj);
        }
        window.history.pushState(null, null, '/lists/'+qs);
    }

    function filterLists(query_term, with_members) {
        var lists = $(".fwdlist").not('.new-list');
        if($.trim(query_term) === "") {
            $(lists).find('.alias-row').removeClass('highlight');
            $(lists).removeClass('hidden');
            return;
        }
        /* Filter lists */
        var re_term = new RegExp(query_term);
        lists.each(function() {
            var list_name = $(this).attr('data-list-name');
            var members = $(this).find('.js-destination');
            var hits = 0;
            if(with_members) {
                hits = _.filter(members, function(el) {
                    var matches = re_term.test($(el).text());
                    if(matches) {
                        $(el).parent().parent().addClass('highlight');
                    } else {
                        $(el).parent().parent().removeClass('highlight');
                    }
                    return matches;
                });
            } else {
                $('.alias-row').removeClass('highlight');
            }

            if(re_term.test(list_name) || (hits.length !== 0 && with_members) ) {
                $(this).removeClass('hidden');
            } else {
                $(this).addClass('hidden');
            }
        });
    }

    function filterListsByOrgUnit(id, prefix) {
        if( !prefix ) {
            prefix = $('.orgunit-list a[data-id="'+id+'"]').attr('data-prefix');
        }
        setActiveOrgUnit(id);
        filterLists(prefix);
        var query_params = {orgunit: id};
        if(id === "") {
            query_params = null;
        }
        setQueryString(query_params);
    }

    function notify(title, text, type) {
        /* types: info, success, error */
        new PNotify({
            title: title,
            text: text,
            type: type,
            delay: 3000,
            animate_speed: 'fast'
        });
    }
    function updateNumEmails(event) {
        var el = $(event.target);
        var emails = parseEmails(el.val());
        var list_name = el.attr('data-list-name');
        var counter = $('.fwdlist[data-list-name="'+ list_name +'"] .email-counter');

        if(emails.length > 0) {
            counter.text(emails.length);
        } else {
            counter.text('');
        }
    }
    function createAliases(new_aliases, onSuccess, onError) {
        $.ajax({
            url: api_urls.aliases,
            type: 'POST',
            headers: {'X-CSRFToken': csrf_token},
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(new_aliases),
            success: onSuccess,
            error: onError
        });
    }
    function setActiveOrgUnit(id) {
        /* Reset active */
        $(".orgunit-list li").removeClass('active');
        /* Set current */
        var org_unit = $('.orgunit-list li a[data-id="'+ id +'"]');
        org_unit.parent().toggleClass('active');
        $('.orgunits-select').val(id); // <select>

        /* Reset search field */
        $('.js-lists-filter-field').val('');
    }
    function setPrefixesRegex(ous) {
        ous = _.map(ous, function(ou) {
            var prefixes = _.map(ou.prefixes, function(prefix) {
                return '^'+ prefix +'-|^'+ prefix +'@';
            });
            ou.prefixes_regex = prefixes.join('|');

            return ou;
        });

        return ous;
    }
    function resetActiveOrgUnit() {
        $(".orgunit-list li").removeClass('active');
        $(".orgunit-list li:first-child").toggleClass('active');
    }

    $(document).ready(function() {
        csrf_token = $('meta[name=x-csrf-token]').attr('content');
        var forwards_container = $(".forwards-container");
        nunjucks.configure({ autoescape: true });
        moment.locale('nb');
        /* Add filter |datefromnow and |date to nunjucks */
        var nunjucks_env = new nunjucks.Environment();

        nunjucks_env.addFilter('datefromnow', function(str) {
            return moment(str).fromNow();
        });

        nunjucks_env.addFilter('date', function(str, strformat) {
            return moment(str).format(strformat);
        });


        /* Lists view (home) */
        if( $('body.home').length ) {
            $('.js-lists-filter-field').focus();
            /* Load orgunits */
            $.getJSON(api_urls.ou_list, function(data) {
                data = setPrefixesRegex(data);

                var ou_html = nunjucks_env.render('orgunits.html', { orgunits: data });
                $(".orgunit-list").append(ou_html);
                var ous_html = nunjucks_env.render('orgunits_select.html', { orgunits: data });
                $(".orgunit-select-container").html(ous_html);

                /* If searching then set q */
                var query_string = queryString.parse(location.search);
                if(query_string.q) {
                    resetActiveOrgUnit();
                    $('.js-lists-filter-field').val(query_string.q);
                }
                if(query_string.orgunit) {
                    setActiveOrgUnit(query_string.orgunit);
                }

                /* Load email domain */
                $.getJSON(api_urls.email_domain, function(email_domain) {
                    email_domain = email_domain.domain;

                    /* New list */
                    var new_list_html = nunjucks_env.render('new_list.html', {
                        orgunits: data,
                        api_urls: api_urls,
                        email_domain: email_domain
                    });
                    $('.new-list').html(new_list_html);

                    /* New list: List name (source) */
                    $('.new-list .js-new-list-name').on('keyup', function() {
                        var new_list_name = $('.new-list .js-new-list-name').val().trim();
                        if(new_list_name === '') {
                            $('.js-new-list-preview').html('Ny liste');
                            return;
                        }
                        var prefix = $('.new-list .prefix-select .active').attr('data-value');
                        var source = prefix + new_list_name + "@" + email_domain.name;
                        var label_html = '<span class="label label-success">Ny</span> ';
                        var existing_list = $('.fwdlist[data-list-name="'+ source +'"]').length;

                        if( existing_list ) {
                            label_html = '<span class="label label-primary">Eksisterende</span> ';
                        }

                        new_list_name = label_html + source;
                        $('.js-new-list-preview').html(new_list_name);
                    });

                    /* New list: Select prefix */
                    $('.new-list .prefix-select a').on('click', function() {
                        $('.new-list .prefix-select a').parent().removeClass('active');
                        $(this).parent().addClass('active');
                        var prefix = $(this).parent().attr('data-value');
                        $('.new-list .prefix-btn').html(prefix+' <span class="caret"></span>');
                    });

                    $('.new-list textarea').on('keyup', updateNumEmails);

                    /* New list: Add list with aliases */
                    $('.js-add-list').on('click', function(e) {
                        e.preventDefault();
                        /* Validate */
                        var new_list_name = $('.new-list .js-new-list-name').val();
                        if(new_list_name.length === 0) {
                            notify('Ny epostliste', 'Navn på epostliste mangler', 'error');
                            return;
                        }
                        var text = $('.new-list textarea').val();
                        var emails = parseEmails(text);
                        if(emails.length === 0) {
                            notify('Ny epostliste', 'Ingen eposter i epost-feltet...', 'error');
                            return;
                        }
                        // Valid form
                        var prefix = $('.new-list .prefix-select .active').attr('data-value');
                        var source = prefix + new_list_name + "@" + email_domain.name;

                        var new_aliases = _.map(emails, function(el) {
                            return {
                                'source': source,
                                'destination': el,
                                'domain': email_domain.id
                            };
                        });
                       
                        createAliases(
                            new_aliases,
                            function(aliases) {
                                $('.new-list textarea').val('');
                                $('.new-list .js-new-list-name').val('');
                                $('.js-new-list-preview').html('Ny liste');
                                $('.new-list .email-counter').html('');
                                var list_name = aliases[0].source;
                                var list_el = $('.fwdlist[data-list-name="'+ list_name +'"]');

                                if(list_el.length) {
                                    /* Append to existing list */
                                    notify('Oppdatert', 'Oppdatert: ' + list_name + ' er oppdatert', 'success');
                                    var list_html = nunjucks_env.render('aliases.html', { 'aliases': aliases });
                                    list_el.find('tbody .alias-row').last().after(list_html);
                                    return;
                                }

                                /* Add new list on top */
                                notify('Lagt til', 'Ny liste: ' + list_name + ' lagt til', 'success');
                                var new_list =_.groupBy(aliases, function(alias) { return alias.source; });
                                var added_list_html = nunjucks_env.render('list.html', { lists: new_list });
                                forwards_container.prepend(added_list_html);
                            },
                            function(xhr) {
                                var error = xhr.responseJSON;
                                var msg = '';
                                if( error && error[0].non_field_errors) {
                                    msg = error[0].non_field_errors[0];
                                }
                                notify('Ikke oppdatert', 'Kunne ikke legge til nye eposter.\n' + msg, 'error');
                            }
                        );
                    });

                    /* Filter lists by orgunit */
                    $(".orgunit-list a").on('click', function(e) {
                        e.preventDefault();
                        var id = $(this).attr('data-id');
                        var prefix = $(this).attr('data-prefix');
                        filterListsByOrgUnit(id, prefix);
                    });
                    $(".orgunits-select").on('change', function() {
                        var id = $(this).val();
                        var prefix = $(this).find(':selected').attr('data-prefix');
                        filterListsByOrgUnit(id, prefix);
                    });
                });
            });

            /* Load forwards from API and put on page */
            $.getJSON(api_urls.aliases, function(data) {
                var err_msg;
                if( data && data.length === 0 ) {
                    err_msg = 'Fant ingen tilhørende lister';
                    notify("Ingen lister.", err_msg, 'info');
                    forwards_container.html(err_msg);
                    return;
                }
                if( data && 'error' in data ) {
                    err_msg = 'Klarte ikke hente epostlister fra APIet: '+data.error;
                    notify('Oops!', err_msg, 'error');
                    forwards_container.html(err_msg);
                    return;
                }

                var lists = _.sortBy(data, function(alias) { return alias.source; });
                lists = _.groupBy(lists, function(alias) { return alias.source; });
                var fw_html = nunjucks_env.render('list.html', { lists: lists });

                forwards_container.html(fw_html);

                /* Filter lists by search term from query string */
                var query_string = queryString.parse(location.search);
                if(query_string.q) {
                    filterLists(query_string.q, true);
                }
                else if(query_string.orgunit) {
                    filterListsByOrgUnit(query_string.orgunit);
                }
            });

            /* Mark row red for deletion and show delete button if applicable */
            forwards_container.on('click', '[name=fwd-delete]', function() {
                $(this).parent().parent().parent().toggleClass('danger');
                var tbody = $(this).closest('tbody');
                var num_selected = tbody.find("[name=fwd-delete]:checked").length;
                if(num_selected > 0) {
                    tbody.find('.link-del').addClass('visible');
                } else {
                    tbody.find('.link-del').removeClass('visible');
                }
            });
            /* Delete selected aliases */
           forwards_container.on('click', '.js-del-selected', function() {
                var list_name = $(this).attr('data-delete-list-name');
                var list_el = $('.fwdlist[data-list-name="'+list_name+'"]');
                var checked = list_el.find('[name="fwd-delete"]:checked');

                var delete_these = _.map(checked, function(el) {
                    return {
                        'source': $(el).attr('data-source'),
                        'destination': $(el).attr('data-destination'),
                        'domain': parseInt($(el).attr('data-domain'), 10)
                    };
                });
                function success(res){
                    var checked_formatted = _.map(delete_these, function(el) { return el.destination; }).join(', ');
                    checked.closest('tr').remove();
                    /* remove list if no more rows */
                    if(list_el.find('.alias-row').length === 0) {
                        list_el.remove();
                    }
                    list_el.find('.link-del').removeClass('visible');
                    notify('Slettet', checked_formatted, 'success');
                }
                function error(res) {
                    notify('Kunne ikke slette', res.detail, 'error');
                }
                var data = {
                    type: 'DELETE',
                    headers: {'X-CSRFToken': csrf_token},
                    url: api_urls.aliases,
                    data: JSON.stringify(delete_these),
                    contentType: "application/json; charset=utf-8",
                    success: success,
                    error: error
                };
                $.ajax(data);
            });

            /* Toggle button for add emails textarea */
            forwards_container.on('click', '.js-toggle-email-textarea', function(e) {
                e.preventDefault();
                var row = $(this).closest('tbody').find('.textarea-row');
                row.toggleClass('visible');

                $(this).closest('tbody').find('textarea').focus();
            });

            /* Add emails to current list */
            forwards_container.on('click', '.js-new-email', function(e) {
                e.preventDefault();
                var source = $(this).attr('data-list-name');
                var textarea = $('textarea[data-list-name="'+source+'"]');
                var emails = parseEmails(textarea.val());
                if(emails.length === 0) {
                    notify('Ny epostliste', 'Ingen eposter i epost-feltet...', 'error');
                    return;
                }
                var list_el = $('.fwdlist[data-list-name="'+source+'"]');
                var new_aliases = _.map(emails, function(el) {
                    return {
                        'source': source,
                        'destination': el,
                        'domain': parseInt(list_el.attr('data-domain'), 10)
                    };
                });
               
                createAliases(
                    new_aliases,
                    function(aliases) {
                        var aliases_formatted = _.map(aliases, function(el) { return el.destination; }).join(', ');
                        notify('Oppdatert '+ aliases[0].source, 'La til epostene: ' + aliases_formatted + '.', 'success');
                        textarea.val('');
                        list_el.find('.email-counter').text('');
                        /* Append to existing list */
                        var added_list_html = nunjucks_env.render('aliases.html', { 'aliases': aliases });
                        list_el.find('tbody .alias-row').last().after(added_list_html);
                    },
                    function(xhr) {
                        var error = xhr.responseJSON;
                        var msg = '';
                        if( error && error[0].non_field_errors) {
                            msg = error[0].non_field_errors[0];
                        }
                        notify('Ikke oppdatert', 'Kunne ikke legge til nye eposter.\n' + msg, 'error');
                    }
                );
            });

            /* Update num emails for all list textarea's */
            forwards_container.on('keyup', '.js-add-list-textarea, .new-list textarea', updateNumEmails);

            /* Filter by search query */
            $('.js-lists-filter-field').on('keyup change', function(e) {
                var term = $(this).val();
                filterLists(term, true);
                resetActiveOrgUnit();
                var query_params = {q: term};
                if(term === "") {
                    query_params = null;
                }
                setQueryString(query_params);
            });

            /* New list toggle display button */
            $('.new-list-btn').on('click', function() {
                $('.new-list').toggleClass('visible');
            });
        }

    });
})();