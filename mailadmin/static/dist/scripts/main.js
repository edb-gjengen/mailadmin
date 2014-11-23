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
        var words = text.split(/[\s\n;"',;:()<>[\]\\]+/),
            emails = [],
            distinct_emails;

        // Regex for identifying an email address.
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // For each of the words, add to the array of emails if the word matches the email regex.
        emails = _.filter(words, function(word) {
            return word.match(re);
        });
        emails = _.map(emails, function(el) {
            return el.toLowerCase();
        });

        return _.unique(emails);
    }
    function renderAlert(msg, alertClass, iconClass) {
        return nunjucks.render('alert.html', {'msg': msg, 'alertClass': alertClass, 'iconClass': iconClass});
    }


    $(document).ready(function() {
        var csrf_token = $('meta[name=x-csrf-token]').attr('content');
        var api_urls = {
            fwd_list: '/api/forwards/',
            fwd_delete: '/api/forward/',
            fwd_create: '/api/forward/', // + forwarder
            ou_list: '/api/orgunits/',
            me: '/api/me/',
        };
        nunjucks.configure({ autoescape: true });

        /* Home view (lists) */
        if( $('body.home').length ) {
            $.getJSON(api_urls.ou_list, function(data) {
                /* OrgUnit list */
                var ou_html = nunjucks.render('orgunits.html', { orgunits: data });
                $(".orgunit-list").append(ou_html);
                var ous_html = nunjucks.render('orgunits_select.html', { orgunits: data });
                $(".orgunit-select-container").html(ous_html);

                /* New list */
                var new_list_html = nunjucks.render('new_list.html', {
                    orgunits: data,
                    api_urls: api_urls
                });

                $('.new-list').html(new_list_html);
                $('.new-list .js-new-list-name').on('keyup', function(e) {
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
                $('.new-list textarea').on('keyup', function(e) {
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
                        $('.new-list-result').html(renderAlert('Navn på epostliste mangler', 'danger'));
                        return;
                    }
                    var text = $('.new-list textarea').val();
                    var emails = parseEmails(text);
                    if(emails.length === 0) {
                        $('.new-list-result').html(renderAlert('Ingen eposter i epost-feltet...', 'danger'));
                        return;
                    }
                    // Valid form
                    var prefix = $('.new-list .prefix-select .active').attr('data-value');
                    var dest = prefix + new_list_name + "@studentersamfundet.no";

                    var new_list = {};
                    new_list[dest] = _.map(emails, function(el) {
                        return {'dest': dest, 'forward': el};
                    });

                    var deferreds = [];
                    $.each(new_list[dest], function(i, el) {
                        el.csrfmiddlewaretoken = csrf_token;
                        deferreds.push($.post(api_urls.fwd_create, el, function() {}, 'json'));
                    });
                    $.when.apply($, deferreds).then(function(){
                        // Success
                        $('.new-list-result').html(renderAlert('Lagt til ny liste: ' + dest, 'success'));
                        $('.new-list textarea').val('');
                        $('.new-list .js-new-list-name').val('');
                    }).fail(function(err){
                        $('.new-list-result').html(renderAlert('Kunne ikke opprette ny liste \'' + dest +'\': '+ err, 'danger'));
                    });
                    var added_list_html = nunjucks.render('list.html', {
                        lists: new_list,
                    });
                    $(".forwards-container").prepend(added_list_html);

                });

                /* Add list filter by orgunit */
                $(".orgunit-list a").on('click', function(e) {
                    var prefix = $(this).attr('data-prefix');
                    var querystring = $(this).attr('href');
                    e.preventDefault();

                    /* Toggle selection */
                    $(".orgunit-list li").removeClass('active');
                    $(this).parent().toggleClass('active');
                    $('.orgunits-select').val(prefix);

                    /* Update query string */
                    window.history.pushState(null, null, querystring);

                    /* Filter lists */
                    var re_prefix = new RegExp('^'+prefix);
                    $(".fwdlist").each(function(el) {
                        var cur_name = $(this).attr('data-list-name');
                        if(re_prefix.test(cur_name)) {
                            $(this).removeClass('hidden');
                        } else {
                            $(this).addClass('hidden');
                        }
                    });
                });
                $(".orgunits-select").on('change', function(e) {
                    var prefix = $(this).val();
                    var querystring = '/lists/?q='+prefix;

                    /* Toggle selection */
                    $(".orgunit-list li").removeClass('active');
                    $(".orgunit-list li a[data-prefix="+prefix+"]").parent().toggleClass('active');

                    /* Update query string */
                    window.history.pushState(null, null, querystring);

                    /* Filter lists */
                    var re_prefix = new RegExp('^'+prefix);
                    $(".fwdlist").each(function(el) {
                        var cur_name = $(this).attr('data-list-name');
                        if(re_prefix.test(cur_name)) {
                            $(this).removeClass('hidden');
                        } else {
                            $(this).addClass('hidden');
                        }
                    });
                });
            });

            /* Load forwards from API and write to container */
            $.getJSON(api_urls.fwd_list, function(data) {
                if( !data.cpanelresult ) {
                    $(".forwards-container").html(renderAlert("No results.", 'info'));
                    return;
                }
                if( 'error' in data.cpanelresult ) {
                    $(".forwards-container").html(renderAlert("Klarte ikke hente epostlister fra APIet: "+data.cpanelresult.error, 'danger'));
                    return;
                }

                var forwards = data.cpanelresult.data;
                var lists =_.groupBy(forwards, function(fwd) { return fwd.dest; });
                var fw_html = nunjucks.render('list.html', {
                    lists: lists,
                    api_urls: api_urls
                });

                $(".forwards-container").html(fw_html);
            });

            /* Mark row red for deletion and show delete button if applicable */
            $(".forwards-container").on('click', '[name=fwd-delete]', function(e) {
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
            $(".forwards-container").on('click', '.js-del-selected', function(e) {
                $(this).attr('data-delete-list-name');
                var checked = $('[data-list-name="'+list_name+'"] [name="fwd-delete"]:checked');
                var delete_these = _.map(checked, function(el) {
                    return $(el).val();
                });
                var deferreds = [];
                $.each(delete_these, function(i, el) {
                    var data = {
                        type: 'DELETE',
                        headers: {'X-CSRFToken': csrf_token},
                        url: api_urls.fwd_delete + el + '/',
                        dataType: 'json'
                    };
                    deferreds.push($.ajax(data));
                });
                $.when.apply($, deferreds).then(function(){
                    // Success
                    checked.closest('tr').remove();
                    // TODO remove list if no more rows
                }).fail(function(err){
                    $('[data-list-name="'+list_name+'"] .result-alert').html(renderAlert('Kunne ikke fjerne epostaliaser', 'danger'));
                });
            });
            /* Toggles emails textarea */
            $(".forwards-container").on('click', '.js-toggle-email-textarea', function(e) {
                e.preventDefault();
                var row = $(this).closest('tbody').find('.textarea-row');
                row.toggleClass('visible');
            });
            /* Add emails to current list */
            $(".forwards-container").on('click', '.js-new-email', function(e) {
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