const route = require('express').Router()
const authMiddle = require('../middleware/auth.middleware')
const BusesController = require('../controllers/buses.controller')
const _busesController = new BusesController()
const busesMiddel = require('./../middleware/buses.middle')


route.get('/get-all',authMiddle.verifyToken,_busesController.getAll)
route.get('/get-id-and-name',authMiddle.verifyToken, _busesController.getAllNameAndId)
route.get('/get-by-id/:id',authMiddle.verifyToken, _busesController.getById)
route.get('/get-by-name',authMiddle.verifyToken,_busesController.getByName)
route.get('/search-by-id-or-name',authMiddle.verifyToken,_busesController.searchByIdOrName)
route.post('/get-favorite-bus',authMiddle.verifyToken,_busesController.getFavoriteBusesByIdUser)
route.put('/add-point-after-id/:id',[authMiddle.verifyToken, authMiddle.admin] ,_busesController.addPointAfterId)
route.put('/add-point-after-index/:id',[authMiddle.verifyToken, authMiddle.admin], _busesController.addPointAfterIndex)
route.post('/add',[authMiddle.verifyToken, authMiddle.admin, busesMiddel.checkInputAdd], _busesController.add)
route.put('/update/:id',[authMiddle.verifyToken, authMiddle.admin, busesMiddel.CheckInputUpdate], _busesController.update)
route.delete('/delete/:id',[authMiddle.verifyToken, authMiddle.admin], _busesController.delete)

module.exports = route