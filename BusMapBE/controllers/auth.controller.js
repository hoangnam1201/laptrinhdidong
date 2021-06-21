require('dotenv').config()
const User = require('../models/user')
const jwtService = require('./../Services/jwtService')
const SHA256 = require('crypto-js/sha256')
const RefreshToken = require('./../models/refreshToken')

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE

const login = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(username)
    try {
        const user = await User.findOne({username: username}).exec()
        console.log(user)
        if (!user) return res.status(400).json({ err: 'invalid username' })
        if (user.password != SHA256(password).toString()) return res.status(400).json({ err: 'invalid password' })

        let dataUser = {
            userId: user._id,
        }
        console.log(dataUser)

        const accessToken =await jwtService.generateToken(dataUser, accessTokenSecret, accessTokenLife)
        const refreshToken =await jwtService.generateToken(dataUser, refreshTokenSecret, refreshTokenLife)

        const storedRefreshToken = await RefreshToken.findOne({ userId: dataUser.userId }).exec()
        if (!storedRefreshToken) {
           RefreshToken.create({ userId: dataUser.userId, token: refreshToken })
        } else {
           RefreshToken.findOneAndUpdate({ userId: dataUser.userId }, { token: refreshToken }).exec()
        }
        return res.json({ accessToken: accessToken, refreshToken: refreshToken })

    } catch (err) {
        return res.status(400).json(err)
    }
}

const refesh = async (req, res) => {
    const userData = { userId: req.userData.userId }
    try{
    const token = await jwtService.generateToken(userData, accessTokenSecret, accessTokenLife)
    return res.json({ accessToken: token })
    }catch(err){
        return res.status(403).json(err)
    }
}

const logout = async (req, res) => {
    const userData = req.userData
    try {
        await RefreshToken.findOneAndUpdate({ userId: userData.userId }, { userId: 'block_' + userData.userId })
        return res.json({ status: 'ok' })
    } catch (err) {
        return res.status(500).json({ status: 'err', err: err })
    }
}

module.exports = {
    login: login,
    refresh: refesh,
    logout: logout
}