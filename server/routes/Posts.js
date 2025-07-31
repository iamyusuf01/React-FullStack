const express = require("express");

const router = express.Router();

const {
  posts,
  listOfPosts,
  byId,
  deletePosts,
} = require("../controllers/posts");
const { validateToken } = require("../middlewares/auth");

router.route("/").post(validateToken, posts);
router.route("/").get(listOfPosts);
router.route("/byId/:id").get(byId);
router.route("/:postId").delete(validateToken, deletePosts);

module.exports = router;
