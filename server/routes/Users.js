const express = require('express')
const { registerUser, loginUser, verifyUser, userProfile } = require('../controllers/users')
const { validateToken } = require('../middlewares/auth')

const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(loginUser)
router.route('/verify-user').get(validateToken, verifyUser)
router.route('/user-info/:id').get( userProfile)

module.exports = router