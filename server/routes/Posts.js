const express = require('express')

const router = express.Router()

const { posts, listOfPosts } = require('../controllers/posts')
router.route("/").post(posts)
router.route('/').get(listOfPosts)

module.exports = router