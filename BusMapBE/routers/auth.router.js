const route = require('express').Router()
const authMiddle = require('./../middleware/auth.middleware')
const authController = require('../controllers/auth.controller')

route.post('/login',authController.login)
route.post('/refresh',authMiddle.verifyRefreshToken,authController.refresh)
route.post('/logout',authController.logout)

module.exports = route