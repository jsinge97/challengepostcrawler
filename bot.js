var request = require('request');
var cheerio = require('cheerio');
module.exports = {
urlPagination: function () {
	var url = "http://pennappsx.challengepost.com/submissions";
	var num = { pagenumber: 1 };
	request(url, function(error, response, html) {
		if (!error) {
			var $ = cheerio.load(html);
	$('ul.pagination').filter(function() {
				var a = $(this);
				num.pagenumber = parseInt(a.children().last().prev().text());
			})
		}
	});
	setTimeout(function cb(){
		var urls = [];
		for (var i = 1; i <= num.pagenumber; i++) {
			var newUrl = url + "?page=" + i;
			urls.push(newUrl);
		}
		console.log(urls);
		return urls;
	}, 2000);
}
}


