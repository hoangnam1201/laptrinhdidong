const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    content: String,
    date: Date
}, { collection: 'history' })

const History = mongoose.model('history', historySchema)
module.exports = History

