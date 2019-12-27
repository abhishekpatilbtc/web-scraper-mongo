const path = require("path");
const router = require("express").Router();
const articlesRoutes = require("./articles");
const scrapeRoutes = require("./scrape");

// Articles routes
router.use("/articles", articlesRoutes);

// Scrape Routes
router.use("/scrape", scrapeRoutes);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
