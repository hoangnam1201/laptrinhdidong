const mongoose = require('mongoose')
const Buses = require('./../models/buses')
const BusStop = require('./../models/bus-stop')
const User = require('../models/user')
const getBuses = (req, res) => {
    Buses.find({}, (err, busses) => {
        if (err)
            res.json(err)
        else
            res.json(busses)
    })
}
module.exports = (app) => {
    
    getFavoriteBuses = (id, res) =>{
        Buses.find({}, (err, buses) => {
            if (err) return res.json(err)
            User.findById(id, (err, user) => {
                if (err) return res.json(err)
                let result = buses.map(b => {
                    let isOwner = false
                    if (user.favoriteBuses.find(bu => bu.toString() === b._id.toString()) != null) {
                        isOwner = true
                    }
                    return { buses: b, isOwner }
                })
                return res.json(result)
            })
        })
    } 

    app.get('/api/buses', (req, res) => {
        getBuses(req, res)
    })
    app.get('/api/buses-name', (req, res) => {
        Buses.find({}, (err, busses) => {
            if (err) return res.json(err)
            if (!busses) return res.json(null)
            console.log(busses)
            let arrName = busses.map(b => b.name)
            let arrId = busses.map(b => b.id)
            res.json([...arrName, ...arrId])
        })
    })
    app.get('/api/buses/:id', (req, res) => {
        Buses.findById(req.params.id).populate('busstops').then(buses => {
            res.json(buses)
        }).catch(err => {
            res.json(err)
        })
    })
    app.get('/api/buses-searchname', (req, res) => {
        console.log(req.query.name)
        Buses.findOne({ name: req.query.name }).populate('busstops').then(buses => {
            res.json(buses)
        }).catch(err => {
            res.json(err)
        })
    })

    app.get('/api/buses-search', (req, res) => {
        const regex = new RegExp(req.query.value, 'i')
        Buses.find({ $or: [{ id: { $regex: regex } }, { name: { $regex: regex } }] }).then(buses => {
            res.json(buses)
        }).catch(err => {
            res.json(err)
        })
    })

    app.post('/api/buses/:iduser', (req, res) => {
        getFavoriteBuses(req.params.iduser, res)
    })


    app.put('/api/buses-PointAfter/:id', (req, res) => {

        const busesId = req.params.id
        const BeforBusStopId = req.query.id
        const newBusStop = {
            name: 'point',
            locationName: req.params.id + '-point',
            latitude: req.body.latitube,
            longitude: req.body.longitube,
            buses: [busesId]
        }

        BusStop.create(newBusStop, (err, point) => {
            if (err) return res.json(err)
            Buses.findById(busesId, (err, buses) => {
                if (err | buses == null) return res.json(err ? err : ' id is not exist')
                let index = buses.busstops.indexOf(BeforBusStopId) + 1;
                Buses.updateOne({ _id: mongoose.Types.ObjectId(busesId) }, {
                    $push: { busstops: { $each: [point._id], $position: index } }
                }, (err, buses) => {
                    if (err) return res.json(err)
                    getBuses(req, res)
                })
            })
        })
    })
    app.put('/api/buses-PointAfterIndex/:id', (req, res) => {

        const busesId = req.params.id
        const index = req.query.index
        const newBusStop = {
            name: 'point',
            locationName: req.params.id + '-point',
            latitude: req.body.latitube,
            longitude: req.body.longitube,
            buses: [busesId]
        }

        BusStop.create(newBusStop, (err, point) => {
            if (err) return res.json(err)
            Buses.updateOne({ _id: mongoose.Types.ObjectId(busesId) }, {
                $push: { busstops: { $each: [point._id], $position: index } }
            }, (err, buses) => {
                if (err) return res.json(err)
                getBuses(req, res)
            })
        })
    })


    app.post('/api/buses', (req, res) => {
        const busstops = req.body.busstops
        const newBuses = {
            id: req.body.id,
            operatingTime: req.body.operatingTime,
            timeDistance: req.body.timeDistance,
            name: req.body.name,
            price: req.body.price,
            seats: req.body.seats,
            busstops: busstops
        }
        Buses.create(newBuses, (err, buses) => {
            if (err) {
                res.json(err)
            } else {
                BusStop.updateMany(
                    { _id: { $in: busstops } },
                    { $push: { buses: buses._id } },
                    (err, busstop) => {
                        if (err) {
                            res.json(err)
                        } else {
                            getBuses(req, res)
                        }
                    })
            }
        })
    })

    app.put('/api/buses/:id', (req, res) => {
        const busstops = req.body.busstops
        const id = req.params.id
        const newBuses = {
            id: req.body.id,
            operatingTime: req.body.operatingTime,
            timeDistance: req.body.timeDistance,
            name: req.body.name,
            price: req.body.price,
            seats: req.body.seats,
            busstops: busstops
        }


        // BusStop.updateMany({ buses: mongoose.Types.ObjectId(id) },
        //     { $pull: { buses: id } }, (err, result) => {

        //     })
        Buses.findOneAndUpdate({ _id: id },
            {
                name: newBuses.name,
                price: newBuses.price,
                seats: newBuses.seats,
                busstops: newBuses.busstops
            }, { new: true }, (err, buses) => {
                if (err) {
                    return res.json(err)
                }
                BusStop.updateMany({ buses: mongoose.Types.ObjectId(id) },
                    { $pull: { buses: id } }, (err, result) => {
                        BusStop.updateMany(
                            { _id: { $in: busstops } },
                            { $push: { buses: buses._id } },
                            (err, busstop) => {
                                if (err) {
                                    res.json(err)
                                } else {
                                    getBuses(req, res)
                                }
                            })
                    })
            })
    })

    app.delete('/api/buses/:id', (req, res) => {
        Buses.findOneAndDelete({ _id: req.params.id }, (err, buses) => {
            if (err) {
                res.json(err)
            } else {
                console.log(buses)
                BusStop.updateMany(
                    { buses: mongoose.Types.ObjectId(buses._id) },
                    { $pull: { buses: buses._id } }).then(busstop => {
                        return getBuses(req, res)
                    }).catch(err => res.json(err))
            }
        })
    })
}