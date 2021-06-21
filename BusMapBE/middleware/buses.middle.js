const Buses = require("../models/buses")

const checkInputAdd = async (req, res, next) => {
    if (!req.body.id || !req.body.operatingTime || !req.body.timeDistance || !req.body.name || !req.body.price || !req.body.seats || !req.body.busstops) {
        return res.status(400).json('fill to all fields')
    }
    try {
        const buses = await Buses.findOne({ id: req.body.id }).exec()
        if (buses) {
            return res.status('400').json({ err: 'buses id already exist ' })
        }
        next()
    } catch (err) {
        return res.status('400').json({ err: "err" })
    }
}

const CheckInputUpdate = async (req, res, next) => {
    if (!req.body.id || !req.body.operatingTime || !req.body.timeDistance || !req.body.name || !req.body.price || !req.body.seats || !req.body.busstops) {
        return res.status(400).json({err: 'fill to all fields'})
    }
    try {
        const buses = await Buses.findById(req.params.id).exec()
        if (buses.id != req.body.id) {
            const existId =await Buses.findOne({ id: req.body.id }).exec()
            if (existId) {
                return res.status('400').json({ err: 'buses id already exist ' })
            }
        }
        next()
    } catch (err) {
        return res.status('400').json({ err: err })
    }
}

module.exports = {
    checkInputAdd: checkInputAdd,
    CheckInputUpdate: CheckInputUpdate
}