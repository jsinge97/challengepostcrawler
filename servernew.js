var express = require('express');
var fs = require('fs');

var request = require('request');
var cheerio = require('cheerio');

var Step = require('step');
var app     = express();


var writeFile = function (json) {fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

});};

var urlRequest = function (url, callback) {
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            $('ul.pagination').filter(function () {
                var a = $(this);
                var num = parseInt(a.children().last().prev().text());
                callback(num, pullHacks);
            });
        }
    });};
var urlFormArray = function (num, callback) {
    var url = "http://pennappsx.challengepost.com/submissions";
    var urls = [];
    for (var i = 1; i <= num; i++) {
        var newUrl = url + "?page=" + i;
        urls.push(newUrl);
    }
    console.log(urls);
    callback(urls);

};
var pullHacks = function (urls) {

    var count = 0;

    console.log(urls);
    var json = [];
    var requestNumber = 0;
    for (url in urls) {
            request(url, function(error, response, html){
                    if(!error){
                        var $ = cheerio.load(html);
                        $('div.software-entry-name.entry-body').each(function(i, element){
                            var a = $(this).children().first();
                            var hack = a.text();
                            hack = hack.replace(/\s{2,}/g,'');
                            var hacker = $('span.user-profile-link', this).text();
                            var info = {
                                hack: hack,
                                hacker: hacker
                            };
                            json.push(info);
                            console.log(json);
                            requestNumber++;
                        });
                    }
                    if (requestNumber == urls.length) {
                        writeFile(json);
                    }
                }
            );
    }
};

app.get('/scrape', function(req, res) {
    var url = "http://pennappsx.challengepost.com/submissions";

    urlRequest(url, urlFormArray);









    res.send("Testing");
});
app.listen('8081');
// console.log(test);
console.log('Magic happens on port 8081');
exports = module.exports = app;