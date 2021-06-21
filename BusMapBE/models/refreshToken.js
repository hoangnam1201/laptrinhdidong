const mongoose = require('mongoose')

const refreshTokenSchema = mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    token: String
},{collection: 'refreshTokens'})
const refreshToken = mongoose.model('refreshTokens',refreshTokenSchema)
module.exports = refreshToken