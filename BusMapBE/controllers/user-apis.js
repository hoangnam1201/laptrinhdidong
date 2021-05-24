const User = require('./../models/user')
const SHA256 = require('crypto-js/sha256')
const Buses = require('../models/buses')

const getUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(500).json(err)
        }
        else {
            res.json(users)
        }
    })
}

getFavoriteBuses = (id, res) => {
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

module.exports = function (app) {

    app.get('/api/users', (req, res) => {
        getUsers(req, res)
    })

    app.get('/api/user-username/:username', (req, res) => {
        User.findOne({ username: req.params.username }, (err, user) => {
            if (err)
                return res.json(err)
            if (!user)
                return res.json(false)
            return res.json(true)
        })
    })

    app.post('/api/user', (req, res) => {
        User.findById(req.body.id, (err, user) => {
            if (err)
                return res.json(err)
            return res.json(user)

        })
    })

    app.post('/api/user-favoriteBuses/:id',(req,res)=>{
        User.findOne({_id:req.params.id}).populate('favoriteBuses').then(user=>{
            let result = user.favoriteBuses.map(b=>{
                return {buses: b, isOwner: true}
            })
            return res.json(result)
        }).catch(err => res.json(err))
    })

    app.get('/api/user-email/:email', (req, res) => {
        User.findOne({ email: req.params.email }, (err, user) => {
            if (err)
                return res.json(err)
            if (!user)
                return res.json(false)
            return res.json(true)
        })
    })

    app.post('/api/user-login', (req, res) => {
        User.findOne({ username: req.body.username, password: SHA256(req.body.password).toString() }, (err, user) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(user)
            }
        })
    })

    app.post('/api/user-loginEmail', (req, res) => {
        User.findOne({ email: req.body.email, password: SHA256(req.body.password).toString() }, (err, user) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.json(user)
            }
        })
    })

    app.post('/api/user-checkpassword', (req, res) => {
        User.findOne({ _id: req.body.id, password: SHA256(req.body.password).toString() }, (err, user) => {
            console.log(req.body.password)
            console.log(user)
            if (err || user == null) {
                res.json(false)
            } else (
                res.json(true)
            )

        })
    })

    app.put('/api/users-addFavoriteBuses/:id', (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id }, { $push: { favoriteBuses: req.body.idBuses } }, { new: true }, (err, result) => {
            if (err) return res.json(err)
            return getFavoriteBuses(req.params.id, res)
        })
    })
    app.put('/api/users-deleteFavoriteBuses/:id', (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id }, { $pull: { favoriteBuses: req.body.idBuses } }, (err, result) => {
            if (err) return res.json(err)
            return getFavoriteBuses(req.params.id, res)
        })
    })

    app.post('/api/users', (req, res) => {
        console.log(req)
        const newUser = {
            fullname: req.body.fullname,
            email: req.body.email,
            username: req.body.username,
            password: SHA256(req.body.password),
            role: 'user'
        }
        User.create(newUser, (err, user) => {
            if (err) {
                res.json(err)
            } else {
                getUsers(req, res)
            }
        })
    })
    app.post('/api/admins', (req, res) => {
        console.log(req.body)
        const newUser = {
            email: req.body.email,
            username: req.body.username,
            password: SHA256(req.body.password),
            role: 'admin'
        }
        User.create(newUser, (err, user) => {
            if (err) {
                res.json(err)
            } else {
                getUsers(req, res)
            }
        })
    })

    app.put('/api/user-email/:id', (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id }, { email: req.body.email }, { new: true }, (err, user) => {
            if (err) {
                res.json(err)
            } else {
                res.json(user)
            }
        })
    })

    app.put('/api/user-password/:id', (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id }, { password: SHA256(req.body.password).toString() }, { new: true }, (err, user) => {
            if (err) {
                res.json(err)
            } else {
                res.json(user)
            }
        })
    })

    app.put('/api/user/:id', (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id },
            { email: req.body.email, fullname: req.body.fullname, username: req.body.username },
            { new: true },
            (err, user) => {
                if (err) {
                    res.json(err)
                } else {
                    res.json(user)
                }
            })
    })

    app.delete('/api/users/:id', (req, res) => {
        User.deleteOne({ _id: req.params.id }, (err, user) => {
            if (err) {
                return res.json(err)
            }
            return getUsers(req, res)

        })
    })


}