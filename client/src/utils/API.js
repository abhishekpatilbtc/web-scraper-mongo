import axios from "axios";

export default {
  // Gets Articles from the Scrape API
  getarticles: function() {
    return axios.get("/scrape");
  },
  // Gets all saved Articles
  getsavedarticles: function() {
    return axios.get("/articles");
  },
  // Deletes the saved Article with the given id
  deletearticle: function(id) {
    return axios.delete("/articles/" + id);
  },
  // Saves an Article to the database
  savearticle: function(ArticleData) {
    return axios.post("/articles", ArticleData);
  }
};

