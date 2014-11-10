$(document).ready(function() {
    nunjucks.configure({ autoescape: true });
    var api_urls = {
        fwd_list: '/api/forwards/',
        fwd_delete: '/api/forward/',
        fwd_create: '/api/forward/',
        ou_list: '/api/orgunits/',
        me: '/api/me/',
    };
    if( $('body.home').length ) {
        $.getJSON(api_urls.ou_list, function(data) {
            var ou_html = nunjucks.render('orgunits.html', {
                orgunits: data,
                api_urls: api_urls
            });

            $(".orgunit-list").append(ou_html);

            /* Add listeners */
            $(".orgunit-list a").on('click', function(e) {
                e.preventDefault();
                $(".orgunit-list li").removeClass('active');
                $(this).parent().toggleClass('active');
                // TODO: you are here
            });
        });
        
        $.getJSON(api_urls.fwd_list, function(data) {
            if( !data.cpanelresult ) {
                $(".forwards-container").html("No results.");
                return;
            }

            var forwards = data.cpanelresult.data;
            var lists =_.groupBy(forwards, function(fwd) { return fwd.dest; });

            var fw_html = nunjucks.render('list.html', {
                lists: lists,
                api_urls: api_urls
            });

            $(".forwards-container").html(fw_html);

            $("input[name=fwd-delete]").click(function() {
                $(this).parent().parent().toggleClass('danger');
            });
        });
    }
});