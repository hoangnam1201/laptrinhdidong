const SHA256 = require('crypto-js/sha256')
const User = require("../models/user")

const checkRegisterUser = async (req, res, next) => {
    if (!req.body.username && !req.body.email && !req.body.fullname && !req.body.password) {
        return res.status(400).json({ err: 'input reqired' })
    }
    try {
        let user = await User.findOne({ username: req.body.username }).exec()
        if (user) return res.status(400).json({ err: 'username already exist' })
        user = await User.findOne({ email: req.body.email }).exec()
        if (user) return res.status(400).json({ err: 'email already exist' })
        next()
    } catch (err) {
        return res.status(500).json({ err: err })
    }

}
const checkChagneInfo = async (req, res, next) => {
    const userId = req.userData.userId
    if (!req.body.username && !req.body.email && !req.body.fullname) {
        return res.status(400).json({ err: 'input reqired' })
    }

    try {
        const user = await User.findById(userId).exec()
        if (user.email != req.body.email) {
            sameEmail = await User.findOne({ email: req.body.email }).exec()
            if (sameEmail) return res.status(400).json({ err: 'email already exist' })
        }
        console.log(user.username, req.body.username)
        if (user.username != req.body.username) {
            let sameUsername = await User.findOne({ username: req.body.username }).exec()
            if (sameUsername) return res.status(400).json({ err: 'username already exist' })
        }
        next()
    } catch (err) {
        return res.status(500).json({ err: err })
    }
}
const checkPassword = async (req, res, next) => {
    const userId = req.userData.userId
    try {
        const user = await User.findById(userId).exec()
        if (user.password != SHA256(req.body.oldPassword).toString()) return res.status(400).json({err: 'invalie old password'})
        next()
    } catch {
        return res.status(500).json({ err: err })
    }
}

module.exports = {
    checkPassword: checkPassword,
    checkRegisterUser: checkRegisterUser,
    checkChagneInfo: checkChagneInfo
}