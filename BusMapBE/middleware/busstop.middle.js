const BusStop = require("../models/bus-stop")

const checkInputUpdate = async (req, res, next) => {
    const busesId = req.params.id
    if (!req.body.name || !req.body.locationName || !req.body.latitude || !req.body.longitude)
        return res.status(400).json({ err: 'fill to all fields' })
    try {
        const busstop = BusStop.findById(busesId).exec()
        if (busstop.name != req.body.busStopsName) {
            const existName = BusStop.findOne({ name: req.body.busStopsName })
            if (existName) res.status(400).json('Bus stop already exist')
        }
        next();

    } catch (err) {

    }
}
module.exports = {
    checkInputUpdate: checkInputUpdate
}