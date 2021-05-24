const { json } = require('express')
const History = require('./../models/history')
const mongoose = require('mongoose')

const getHistory = (req, res) => {
    History.find({}, (err, histories) => {
        if (err)
            return res.json(err)
        return res.json(histories)
    })
}

module.exports = (app) => {

    app.get('/api/histories', (req, res) => {
        getHistory(req, res)
    })
    app.get('/api/history/:iduser', (req, res) => {
        History.find({ user: mongoose.Types.ObjectId(req.params.iduser) }, (err, histories) => {
            if (err)
                return res.json(err)
            return res.json(histories)
        })
    })
    app.post('/api/histories/:iduser', (req, res) => {
        const newHistory = {
            user: req.params.iduser,
            content: req.body.content,
            date: Date.now()
        }
        History.create(newHistory, (err, history) => {
            if (err)
                return res.json(err)
            return getHistory(req, res)
        })
    })

}