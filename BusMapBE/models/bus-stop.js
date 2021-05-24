const mongoose = require('mongoose')

const busStopSchema = mongoose.Schema({
    name: String,
    locationName: String,
    latitude: Number,
    longitude: Number,
    buses: [{ type: mongoose.Schema.Types.ObjectId, ref:'buses' }]
},{collection: 'busstop'})
const BusStop = mongoose.model('busstop',busStopSchema)
module.exports = BusStop