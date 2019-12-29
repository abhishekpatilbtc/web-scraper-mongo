const router = require("express").Router();
const axios = require("axios");
var cheerio = require("cheerio");

// Defining methods for the scrapeController

// findAll searches the Scrape API and returns only the entries we haven't already saved

// It also makes sure that the books returned from the API all contain a title, author, link, description, and image
module.exports = {
  findAll: function(req, res) {
    const articlesArr = [];
    // Get the html from wsj.com
    axios.get("https://www.wsj.com/news/technology")
    .then(response => {
     // Turn that html into a jQuery like DOM
        const $ = cheerio.load(response.data);
        let titlesArr = [];
    //console.log(response.data)
     // Search the DOM using jQuery-like features to find articles
        $(".wsj-headline a.wsj-headline-link").each((index, title) => {
        
            const article = {};
            article.id = index;
            article.title = $(title).text();
            article.link = $(title).attr("href");

            if (titlesArr.indexOf(article.title) == -1 ) {
                titlesArr.push(article.title);
                articlesArr.push(article);
            }
        
        });

        let obj = {
            articles: articlesArr
        }
        
        res.json(obj.articles);

    }).catch(err => {
        res.json(err)
    });
  }
};
