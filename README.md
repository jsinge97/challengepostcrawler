# Challengepost Crawler

#### Scrape your challenge post submissions site for easy table assignments

How to install:

`git clone https://github.com/jsinge97/challengepostcrawler`

Edit the 


`var url = "**CHALLENGEPOST URL SUBMISSIONS";`

to whatever hackathon url submissions url you need. Example:
`var url = "sohacks2014.challengepost.com/submissions";`

Then save.

Navigate to the repository in your command line, then run:

`npm install`

`node main.js`

Then go to this url in your browser:
[http://localhost:8080/scrape](http://localhost:8080/scrape)

After that, you can see the progress in your console and the final result in the output.json file.

Things to do:
1. Clean up JSON
2. Some async cleanup
