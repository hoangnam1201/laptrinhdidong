const mongoose = require('mongoose')
const Buses = require('../models/buses')
const BusStop = require('../models/bus-stop')
const mapService = require('../Services/MapService.js')
const _mapService = new mapService()

const getBusStops = (req, res) => {
    BusStop.find({ name: { $ne: 'point' } }, (err, busstops) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.json(busstops)
        }
    })
}

module.exports = function () {
    this.deleteNullPoint = (req, res) => {
        BusStop.find({ name: 'point', buses: { $size: 0 } }).exec((err, busstops) => {
            if (err) return res.status(400).json(err)
            return res.json(busstops)
        })
    }
    this.getAll = async (req, res) => {
        console.log(_mapService.distanceBetweenPoint(10.99745994471673, 106.87185864560696, 10.997243690317715, 106.87850555965828))
        getBusStops(req, res)
    }
    this.getById = async (req, res) => {
        BusStop.findById(req.params.id).populate('buses').then(busstop => {
            res.json(busstop)
        }).catch(err => {
            res.status(400).json(err)
        })
    }
    this.searchName = async (req, res) => {
        console.log(req.query.name)
        BusStop.findOne({ name: req.query.name }).populate('buses').then(busstop => {
            return res.json(busstop)
        }).catch(err => {
            return res.status(400).json(err)
        })
    }
    this.getName = async (req, res) => {
        console.log('value :' + req.query.value)
        if (!req.query.value || req.query.value == '') return res.json([])
        let value = req.query.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(`${value}`, 'i')
        BusStop.find({ name: { $regex: regex } }).distinct('name').exec((err, name) => {
            if (err) return res.status(400).json(err)
            BusStop.find({ locationName: { $regex: regex } }).distinct('locationName').exec((err, locationName) => {
                if (err) return res.status(400).json(err)
                return res.json([...name, ...locationName])
            })
        })
    }

    this.getAllName = async (req, res) => {
        const regex = new RegExp('^((?!point).)*$')
        BusStop.find({ name: { $regex: regex } }).distinct('name').exec((err, name) => {
            if (err) return res.status(400).json(err)
            BusStop.find({ locationName: { $regex: regex } }).distinct('locationName').exec((err, locationName) => {
                if (err) return res.status(400).json(err)
                return res.json([...name, ...locationName])
            })
        })

    }

    this.search = async (req, res) => {
        let value = req.query.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(value, 'i')
        BusStop.findOne({ $or: [{ name: { $regex: regex } }, { locationName: { $regex: regex } }] }, (err, busStops) => {
            if (err) return res.json(err)
            return res.json(busStops)
        })
    }

    this.getAround = async (req, res) => {
        const regex = new RegExp('^((?!point).)*$')
        const origin = req.body.origin
        const dest = req.body.dest
        mongoose.Aggregate
        BusStop.find({ name: { $regex: regex } }).exec((err, busStops) => {
            if (err) return res.json(err)
            arr = busStops.filter(b => {
                return _mapService.distanceBetweenPoint(origin.latitude, origin.longitude, b.latitude, b.longitude) < 1 || _mapService.distanceBetweenPoint(dest.latitude, dest.longitude, b.latitude, b.longitude) < 1
            })
            return res.json(arr)
        })
    }

    this.add = async (req, res) => {
        if (!req.body.name || !req.body.locationName || !req.body.latitude || !req.body.longitude)
            return res.status(400).json({ err: 'fill to all field' })
        const newBusStop = {
            name: req.body.name,
            locationName: req.body.locationName,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            buses: []
        }
        BusStop.findOne({ name: newBusStop.name }, (err, busstop) => {
            if (err) return res.json(err)
            if (busstop != null) return res.status(400).json({ err: 'busstop already exists' })
            BusStop.create(newBusStop, (err, busStop) => {
                if (err) {
                    res.json(err)
                } else {
                    getBusStops(req, res)
                }

            })
        })
    }
    this.update = async (req, res) => {
        const newBusStop = {
            name: req.body.name,
            locationName: req.body.locationName,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            buses: []
        }
        BusStop.findOneAndUpdate({ _id: req.params.id }, {
            name: newBusStop.name,
            locationName: newBusStop.locationName,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        },
            { new: true }, (err, busstop) => {
                if (err) {
                    return res.json(err)
                }
                getBusStops(req, res)
            })
    }

    this.delete = (req, res) => {
        BusStop.findOneAndDelete({ _id: req.params.id }, (err, busStop) => {
            if (err) {
                res.json(err)
            } else {
                Buses.updateMany({ busstops: mongoose.Types.ObjectId(busStop._id) },
                    { $pull: { busstops: busStop._id } }, (err, buses) => {
                        if (err)
                            return res.json(err)
                        return getBusStops(req, res)
                    })
            }
        })
    }

    this.filter = async (req, res) => {
        BusStop.deleteMany({ $or: [{ name: null }, { locationName: null }, { latitude: null }, { longitude: null }] }, (err, buses) => {
            if (err) return res.status(400).json(err)
            return getBusStops(req, res)
        })
    }
}