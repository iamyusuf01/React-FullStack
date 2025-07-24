const express = require('express')
const { likes } = require('../controllers/likes')
const {validateToken} = require('../middlewares/auth')
const router = express.Router()

router.route('/').post(validateToken, likes)

module.exports  = router