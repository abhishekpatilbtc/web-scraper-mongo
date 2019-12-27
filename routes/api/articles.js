const router = require("express").Router();
const articleController = require("../../controllers/articlesController");

// Matches with "/articless"
router.route("/")
  .get(articleController.findAll)
  .post(articleController.create);

// Matches with "/articless/:id"
router
  .route("/:id")
  .get(articleController.findById)
  .put(articleController.update)
  .delete(articleController.remove);

module.exports = router;
