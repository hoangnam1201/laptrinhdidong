const route = require('express').Router()
const mapController = require('./../controllers/map.controller')

route.get('/geocoding', mapController.geocodeding)

module.exports = route