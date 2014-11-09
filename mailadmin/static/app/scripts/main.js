$(document).ready(function() {
	var api_urls = {
		fwd_list: '/api/forwards/',
		fwd_delete: '/api/forward/',
		fwd_create: '/api/forward/',
		ou_list: '/api/orgunits/',
	};
	$.getJSON(api_urls.fwd_list, function(data) {
		if( !data.cpanelresult ) {
			$(".forwards-container").html("No results.");
			return;
		}

		var forwards = data.cpanelresult.data;
		console.log(forwards);
		var lists =_.groupBy(forwards, function(fwd) { return fwd.dest;	});
		console.log(lists);
		nunjucks.configure({ autoescape: true });
		var forward_html = nunjucks.render(
			'static/app/templates/list.html',
			{
				lists: lists,
				api_urls: api_urls
		});

		$(".forwards-container").html(forward_html);
	});
});