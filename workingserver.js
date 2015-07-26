var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var bot     = require('./bot.js');
var app     = express();

var urls = (bot.urlPagination());
console.log(urls);
var url = "http://pennappsx.challengepost.com/submissions";
app.get('/scrape', function(req, res){
                request(url, function(error, response, html) {
                    if (!error) {
                        var $ = cheerio.load(html);
            
                        var json = [];
                        $('div.software-entry-name.entry-body').each(function (i, element) {
                            var a = $(this).children().first();
                            var hack = a.text();
                            hack = hack.replace(/\s{2,}/g, '');
                            var hacker = $('span.user-profile-link', this).text();
                            var info = {
                                hack: hack,
                                hacker: hacker
                            };
                            console.log(info);
                            json.push(info);
                        });
                    }
            
                    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
                        console.log('File successfully written! - Check your project directory for the output.json file');
                    })
                    res.send('Check your console!')
                })
})
app.listen('8081')
// console.log(test);
console.log('Magic happens on port 8081');
exports = module.exports = app;     

