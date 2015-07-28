var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

// Function helpers
var urlRequest = function (url, callback) {
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            $('ul.pagination').filter(function () {
                var a = $(this);
                var num = parseInt(a.children().last().prev().text());
                callback(url, num, pullHacks);
            });
        }
    });
};

var urlFormArray = function (url, num, callback) {
    
    var urls = [];
    for (var i = 1; i <= num; i++) {
        var newUrl = url + "?page=" + i;
        urls.push(newUrl);
    }
    callback(urls);
};
var pullHacks = function (urls) {

    console.log(urls);
    var i = 0;
    var urls = urls;
    for (var requestNumber = 0; requestNumber <= urls.length - 1; requestNumber++) {
        var url = urls[requestNumber];
        traverseHacks(url);
    }
};

var traverseHacks = function (url, json, callback) {
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
                    console.log(info);
                    writeFile(info);
                });
            }
        }
    );
};

var writeFile = function (info) {
    fs.appendFile('output.json', JSON.stringify(info, null, 4), function(err) {
        console.log("Hack written to json");
    });
};
// Instantiation of script
app.get('/scrape', function(req, res) {
    var url = "**CHALLENGEPOST URL SUBMISSIONS";
    urlRequest(url, urlFormArray);
    res.send("Check the your folder for the output");
});
app.listen('8080');
console.log('Visit http://localhost:8080/scrape in your browser to get the hacks, make sure you change your challengepost/devpost submissions url in the server file. Example: http://mhacks.devpost.com/submissions');
