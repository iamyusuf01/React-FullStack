const express = require('express')

const router = express.Router()

const { posts, listOfPosts, byId } = require('../controllers/posts')
router.route("/").post(posts)
router.route('/').get(listOfPosts)
router.route("/byId/:id").get(byId)

module.exports = router