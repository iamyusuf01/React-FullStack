const express = require('express')
const router = express.Router();
// const {Comments } = require('../models');
// const { auth } = require("../middlewares");


const { comments, addComments } = require('../controllers/comments');
const { validateToken } = require('../middlewares/auth');
router.route('/:postId').get(comments)
router.route('/', validateToken).post(addComments)

module.exports = router