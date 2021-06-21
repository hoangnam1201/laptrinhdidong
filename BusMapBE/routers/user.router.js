const route = require('express').Router()
const authMiddle = require('../middleware/auth.middleware')
const checkInfoMiddle = require('../middleware/checkInfo.middleware')
const userController = require('../controllers/user.controller')
const _userController = new userController()

route.get('/get-all', [authMiddle.verifyToken, authMiddle.admin], _userController.getAll)
route.post('/get-infor', authMiddle.verifyToken, _userController.getInfo)
route.post('/get-by-username', [authMiddle.verifyToken,authMiddle.admin], _userController.getByUsername)
route.post('/get-favorite-bus', authMiddle.verifyToken, _userController.getFavoriteBusesOfUser)
route.put('/add-favorite-bus', authMiddle.verifyToken, _userController.addFavoriteBuses)
route.put('/delete-favorite-bus', authMiddle.verifyToken, _userController.deleteFavoriteBuses)
route.post('/add', checkInfoMiddle.checkRegisterUser, _userController.add)
route.put('/update-password', [authMiddle.verifyToken, checkInfoMiddle.checkPassword], _userController.updatePassword)
route.put('/update-infomation', [authMiddle.verifyToken, checkInfoMiddle.checkChagneInfo], _userController.updateInfor)
route.delete('/delete/:id', [authMiddle.verifyToken, authMiddle.admin], _userController.delete)

module.exports = route
