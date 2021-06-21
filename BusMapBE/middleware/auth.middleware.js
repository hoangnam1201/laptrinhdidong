require('dotenv').config()
const jwtService = require('./../Services/jwtService')
const RefreshToken = require('./../models/refreshToken')
const mongoose  = require('mongoose')
const User = require('../models/user')

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

const verifyToken = async (req, res, next) => {
    try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = await jwtService.verifyToken(token, accessTokenSecret)
    req.userData = decoded
    next()
    }catch(err){
        return res.status(401).json({message:'invalid access token',err: err})
    }
}

const verifyRefreshToken = async (req, res, next) => {
    const refreshToken = req.body.refreshToken
    if (!refreshToken) return res.status(403).json({ message: 'invalue refresh token', err: 'refresh token is undefined or null' })
    try {
        const decoded = await jwtService.verifyToken(refreshToken, refreshTokenSecret)
        const storedRefreshToken = await RefreshToken.findOne({ userId:mongoose.Types.ObjectId(decoded.userId) }).exec()
        if (!storedRefreshToken) return res.status(403).json({ err: 'invailid refreshToken' })
        if (storedRefreshToken.token != refreshToken) return res.status(403).json({ err: 'token is not same in stored' })
        req.userData = decoded
        next()
    } catch(err) {
        return res.status(403).json({ err: 'invailid refreshToken' })
    }
}

const admin = async (req, res, next)=>{
    const userData = req.userData
    try{
        const user = await User.findById(userData.userId).exec()
        if(user.role!== 'admin') return res.status(500).json('the role dont have premission')
        next()
    }catch(err){
        return res.status(500).json(err)
    }

}

module.exports = {
    verifyRefreshToken: verifyRefreshToken,
    verifyToken: verifyToken,
    admin: admin
}