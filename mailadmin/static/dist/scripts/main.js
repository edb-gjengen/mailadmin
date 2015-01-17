(function() {
    'use strict';
    /*global moment, jQuery, document, _, $, window, List */
    function getParameterByName(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

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
    function filter_lists(term, pushState, with_members) {
        if(pushState) {
            /* Update query string */
            window.history.pushState(null, null, '/lists/?q=' + term);
        }

        /* Filter lists */
        var re_term = new RegExp(term);
        $(".fwdlist").each(function() {
            var cur_name = $(this).attr('data-list-name');
            var members = $(this).find('.member');
            var hits = _.filter(members, function(el) {
                return re_term.test($(el).text());
            });
            if(re_term.test(cur_name) || (hits.length !== 0 && with_members) ) {
                $(this).removeClass('hidden');
            } else {
                $(this).addClass('hidden');
            }
        });

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

    $(document).ready(function() {
        var csrf_token = $('meta[name=x-csrf-token]').attr('content');
        var api_urls = {
            aliases: '/api/aliases/',
            ou_list: '/api/orgunits/',
            me: '/api/me/'
        };
        var forwards_container = $(".forwards-container");
        nunjucks.configure({ autoescape: true });

        /* Lists view (home) */
        if( $('body.home').length ) {
            $.getJSON(api_urls.ou_list, function(data) {
                /* Load orgunit list */
                var ou_html = nunjucks.render('orgunits.html', { orgunits: data });
                $(".orgunit-list").append(ou_html);
                var ous_html = nunjucks.render('orgunits_select.html', { orgunits: data });
                $(".orgunit-select-container").html(ous_html);
                var q_term = getParameterByName('q');
                if(q_term && q_term[0] === '^') {
                    var prefix = q_term.slice(1, -1);
                    $(".orgunit-list li").removeClass('active');
                    $('.orgunit-list li a[data-prefix="'+prefix+'"]').parent().toggleClass('active');
                }

                /* New list */
                var new_list_html = nunjucks.render('new_list.html', {
                    orgunits: data,
                    api_urls: api_urls
                });


                $('.new-list').html(new_list_html);
                $('.new-list .js-new-list-name').on('keyup', function() {
                    var new_list_name = $('.new-list .js-new-list-name').val();
                    if(new_list_name === '') {
                        new_list_name = 'Ny liste';
                    } else {
                        var prefix = $('.new-list .prefix-select .active').attr('data-value');
                        new_list_name = 'NY: ' + prefix + new_list_name + "@studentersamfundet.no";
                    }
                    $('.js-new-list-preview').text(new_list_name);
                });
                /* Prefix select */
                $('.new-list .prefix-select a').on('click', function() {
                    $('.new-list .prefix-select a').parent().removeClass('active');
                    $(this).parent().addClass('active');
                    var prefix = $(this).parent().attr('data-value');
                    $('.new-list .prefix-btn').html(prefix+' <span class="caret"></span>');
                });
                // TODO put this in a function with selector as argument
                $('.new-list textarea').on('keyup', function() {
                    var text = $(this).val();
                    var emails = parseEmails(text);

                    if(emails.length > 0) {
                        $('.new-list .email-counter').text(emails.length);
                    } else {
                        $('.new-list .email-counter').text('');
                    }
                });
                $('.js-add-list').on('click', function(e) {
                    $('.new-list .result').html(''); // reset errors
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
                    var dest = prefix + new_list_name + "@studentersamfundet.no";

                    var new_list = {};
                    new_list[dest] = _.map(emails, function(el) {
                        return {'dest': dest, 'forward': el};
                    });

                    $.post(
                        api_urls.aliases,
                        new_list[dest],
                        function() {
                            notify('Lagt til', 'Ny liste: ' + dest + 'lagt til', 'success');
                            $('.new-list textarea').val('');
                            $('.new-list .js-new-list-name').val('');
                        },
                        'json'
                    );
                    var added_list_html = nunjucks.render('list.html', { lists: new_list });
                    forwards_container.prepend(added_list_html);

                });

                /* Filter lists by orgunit */
                $(".orgunit-list a").on('click', function(e) {
                    var prefix = $(this).attr('data-prefix');
                    e.preventDefault();

                    /* Toggle selection */
                    $(".orgunit-list li").removeClass('active');
                    $(this).parent().toggleClass('active');
                    $('.orgunits-select').val(prefix);

                    filter_lists('^'+prefix+'-', true);
                    $('.js-lists-filter-field').val('');
                });
                $(".orgunits-select").on('change', function() {
                    var prefix = $(this).val();

                    /* Toggle selection */
                    $(".orgunit-list li").removeClass('active');
                    $(".orgunit-list li a[data-prefix="+prefix+"]").parent().toggleClass('active');

                    filter_lists('^'+prefix+'-', true);
                    $('.js-lists-filter-field').val('');
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

                var forwards = data;
                var lists =_.groupBy(forwards, function(fwd) { return fwd.source; });
                var fw_html = nunjucks.render('list.html', { lists: lists });

                forwards_container.html(fw_html);

                /* Load filter from query string */
                var q_term = getParameterByName('q');
                if(q_term) {
                    if(q_term[0] === '^') {
                        filter_lists(q_term, false);
                    } else {
                        filter_lists(q_term, false, true);
                    }
                }
                /* Filter by search query */
                $('.js-lists-filter-field').on('keyup', function() {
                    var term = $(this).val();
                    filter_lists(term, true, true);
                    $(".orgunit-list li").removeClass('active');
                    $(".orgunit-list li:first-child").toggleClass('active');
                });
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
            /* Delete selected */
           forwards_container.on('click', '.js-del-selected', function() {
                var list_name = $(this).attr('data-delete-list-name');
                var checked = $('[data-list-name="'+list_name+'"] [name="fwd-delete"]:checked');
                var delete_these = _.map(checked, function(el) {
                    return $(el).val();
                });
                var data = {
                    type: 'DELETE',
                    headers: {'X-CSRFToken': csrf_token},
                    url: api_urls.aliases,
                    data: delete_these,
                    dataType: 'json'
                };
                $.ajax(data, function(){
                    // Success
                    checked.closest('tr').remove();
                    // TODO remove list if no more rows
                });
            });

            /* Toggles emails textarea */
            forwards_container.on('click', '.js-toggle-email-textarea', function(e) {
                e.preventDefault();
                var row = $(this).closest('tbody').find('.textarea-row');
                row.toggleClass('visible');
            });

            /* Add emails to current list */
            forwards_container.on('click', '.js-new-email', function(e) {
                e.preventDefault();
                // TODO refactor logic from new list and add here
            });

            /* New list toggle display */
            $('.new-list-btn').on('click', function() {
                $('.new-list').toggleClass('visible');
            });
        }

    });
})();