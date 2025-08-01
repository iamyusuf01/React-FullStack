const express = require("express");

const router = express.Router();

const {
  posts,
  listOfPosts,
  byId,
  deletePosts,
  byUserId,
  editTitle,
  editPostText,
} = require("../controllers/posts");
const { validateToken } = require("../middlewares/auth");

router.route("/").post(validateToken, posts);
router.route("/").get(listOfPosts);
router.route("/byId/:id").get(byId);
router.route("/:postId").delete(validateToken, deletePosts);
router.route('/byUserId/:id').get(byUserId)
router.route('/title').put(editTitle)
router.route('/postText').put(editPostText)

module.exports = router;
