var express = require('express');
var fs = require('fs');
var async = require('async');
var request = require('request');
var cheerio = require('cheerio');
var bot     = require('./bot.js');
var app     = express();

// Refactor entire codebase using node js callback systems
// All existing code is here, it just needs to be written in such a format where it works together
app.get('/scrape', function(req, res){
    function urlPagination () {
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
            return urls;
        }, 5000);
    }
    var urls = urlPagination();
    var json = [];
    var i = 0;

    var traverse = function() {
        var url = urls[i];
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
                i++;
            });
        }

        res.send('Check your console!')
    });}



})
app.listen('8081')
// console.log(test);
console.log('Magic happens on port 8081');
exports = module.exports = app;     

