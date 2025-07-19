const express = require('express')
const router = express.Router();
const {Comments } = require('../models');

const { comments, addComments } = require('../controllers/comments');
router.route('/:postId').get(comments)
router.route('/').post(addComments)

module.exports = router