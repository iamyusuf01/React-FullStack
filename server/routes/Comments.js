const express = require('express')
const router = express.Router();
// const {Comments } = require('../models');
// const { auth } = require("../middlewares");


const { comments, addComments, deleteComments } = require('../controllers/comments');
const { validateToken } = require('../middlewares/auth');
router.route('/:postId').get(comments)
router.route('/').post(validateToken, addComments)
router.route('/:commentId').delete(validateToken, deleteComments)

module.exports = router