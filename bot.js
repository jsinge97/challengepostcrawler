var request = require('request');
var cheerio = require('cheerio');
exports.urlPagination = function urlPagination () {
	var url = "http://pennappsx.challengepost.com/submissions";
	var num = { pagenumber: 1 };
	var urls = [];
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

		for (var i = 1; i <= num.pagenumber; i++) {
			var newUrl = url + "?page=" + i;
			urls.push(newUrl);
		}
		console.log(urls);
	}, 5000);


}
// you need to set up your call back system so that each time something happens,
// each response depends on another, this is proper node style. So you should make a request,
// and using that response call the bot to propagate the array and then somehow make a request
// to the api, that will propagate the output json file



