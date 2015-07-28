# Challengepost Crawler || Dev Post Crawler

#### Scrape your challenge/dev post submissions site for easy table assignments

How to install:

`git clone https://github.com/jsinge97/challengepostcrawler`

Edit the 


`var url = "**CHALLENGE/DEV POST URL SUBMISSIONS";`

to whatever hackathon url submissions url you need.

Example:
`var url = "http://sohacks2014.devpost.com/submissions/";`

Don't forget the http etc., then save.

Navigate to the repository in your command line, then run:

`npm install`

`node main.js`

Then go to this url in your browser:
[http://localhost:8080/scrape](http://localhost:8080/scrape)

After that, you can see the progress in your console and the final result in the output.json file.

Things to do:
1. Clean up JSON
2. Some async cleanup
