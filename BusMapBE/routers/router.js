const busStopRouter = require('./bus-stop.router')
const busesRouter = require('./buses.router')
const usersRouter = require('./user.router')
const authRouter = require('./auth.router')
const mapRouter =require('./map.router')

module.exports = (app) => {
    app.use('/api/busstops', busStopRouter)
    app.use('/api/buses', busesRouter)
    app.use('/api/users', usersRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/map', mapRouter)
}