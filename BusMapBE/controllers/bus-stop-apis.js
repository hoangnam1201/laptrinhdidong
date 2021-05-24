const mongoose = require('mongoose')
const Buses = require('../models/buses')
const BusStop = require('./../models/bus-stop')
const mapService = require('./../Services/MapService.js')
const _mapService = new mapService()

const getBusStops = (req, res) => {
    BusStop.find({}, (err, busstops) => {
        if (err) {
            res.json(err)
        } else {
            res.json(busstops)
        }
    })
}

module.exports = (app) => {
    app.get('/api/busstops', (req, res) => {
        console.log(_mapService.distanceBetweenPoint(10.99745994471673, 106.87185864560696, 10.997243690317715, 106.87850555965828))
        getBusStops(req, res)
    })
    app.get('/api/busstops/:id', (req, res) => {
        BusStop.findById(req.params.id).populate('buses').then(busstop => {
            res.json(busstop)
        }).catch(err => {
            res.json(err)
        })
    })
    app.get('/api/busstops-searchname', (req, res) => {
        console.log(req.query.name)
        BusStop.findOne({ name: req.query.name }).populate('buses').then(busstop => {
            return res.json(busstop)
        }).catch(err => {
            return res.json(err)
        })
    })
    app.get('/api/busstops-getname', (req, res) => {
        if (req.query.value === '' || !req.query.value) {
            return res.json([])
        }
        let value = req.query.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(value, 'i')
        BusStop.find({ name: { $regex: regex } }, (err, busStops) => {
            if (err) return res.json(err)
            let arrName = busStops.map(b => b.name)
            let arr = [...new Set(arrName)].filter(b => !(b.indexOf('point') != -1))
            return res.json(arr)
        })
    })

    app.get('/api/busstops-getAllname',(req, res)=>{
        BusStop.find({}, (err, busStops) => {
            if (err) return res.json(err)
            let arrName = busStops.map(b => b.name)
            let arr = [...new Set(arrName)].filter(b => !(b.indexOf('point') != -1))
            return res.json(arr)
        })

    })

    app.get('/api/busstops-search', (req, res) => {
        const regex = new RegExp(req.query.value, 'i')
        BusStop.findOne({ $or: [{ name: { $regex: regex } }, { locationName: { $regex: regex } }] }, (err, busStops) => {
            if (err) return res.json(err)
            return res.json(busStops)
        })
    })

    app.post('/api/busstops', (req, res) => {
        const newBusStop = {
            name: req.body.busstopName,
            locationName: req.body.locationName,
            latitude: req.body.latitube,
            longitude: req.body.longitube,
            buses: []
        }
        BusStop.findOne({ name: newBusStop.name }, (err, busstop) => {
            if (err) return res.json(err)
            if (busstop != null) return res.json({ err: 'busstop already exists' })
            BusStop.create(newBusStop, (err, busStop) => {
                if (err) {
                    res.json(err)
                } else {
                    getBusStops(req, res)
                }

            })
        })
    })
    app.put('api/busstops/:id', (req, res) => {
        const newBusStop = {
            name: req.body.busstopName,
            locationName: req.body.locationName,
            latitude: req.body.latitube,
            longitude: req.body.longitube,
            buses: []
        }
        BusStop.findOneAndUpdate({ _id: req.params.id }, {
            name: newBusStop.name,
            locationName: newBusStop.name,
            latitude: req.body.latitube,
            longitude: req.body.longitube
        },
            { new: true }, (err, busstop) => {
                if (err) {
                    return res.json(err)
                }
                return res.json(busstop)
            })
    })

    app.delete('/api/busstops/:id', (req, res) => {
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
    })
}