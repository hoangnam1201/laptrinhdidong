const mongoose = require('mongoose')

const busesSchema = mongoose.Schema({
    id: String,
    operatingTime: String, 
    timeDistance: String,
    name: String,
    price: Number,
    seats: Number,
    busstops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'busstop'}]
},{collection: 'buses'})

const Buses = mongoose.model('buses', busesSchema)
module.exports = Buses