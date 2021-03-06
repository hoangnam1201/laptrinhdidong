const route = require('express').Router()
const authMiddle = require('../middleware/auth.middleware')
const BusStopController = require('../controllers/bus-stops.controller')
const busstopMiddle = require('../middleware/busstop.middle')
const _busStopController = new BusStopController()

route.get('/get-all',authMiddle.verifyToken, _busStopController.getAll)
route.get('/get-by-id/:id',authMiddle.verifyToken, _busStopController.getById)
route.get('/search-name',authMiddle.verifyToken,_busStopController.searchName)
route.get('/search',authMiddle.verifyToken,_busStopController.search)
route.get('/get-name',authMiddle.verifyToken, _busStopController.getName)
route.get('/get-all-name',authMiddle.verifyToken, _busStopController.getAllName)
route.post('/around',authMiddle.verifyToken, _busStopController.getAround)
route.post('/add',[authMiddle.verifyToken, authMiddle.admin], _busStopController.add)
route.put('/update/:id',[authMiddle.verifyToken, authMiddle.admin, busstopMiddle.checkInputUpdate], _busStopController.update)
route.delete('/filter',[authMiddle.verifyToken, authMiddle.admin], _busStopController.filter)
route.delete('/delete/:id',[authMiddle.verifyToken, authMiddle.admin], _busStopController.delete)
route.get('/deleteNullPoint', _busStopController.deleteNullPoint)
module.exports = route