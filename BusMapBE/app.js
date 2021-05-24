const express = require('express')
const mongoose = require('mongoose')
const userManagement = require('./controllers/user-apis')
const busesManagement = require('./controllers/buses-api')
const busStopManagement = require('./controllers/bus-stop-apis')
const historyManagement = require('./controllers/history-apis')
const mapLocationManagement = require('./controllers/map-location')
const mapLocation = require('./controllers/map-location')
const port = process.env.PORT || 3000
const app = express()



app.use(express.json())
app.use(express.urlencoded({extended: false}))

// const url = 'mongodb://localhost:27017/busap'
const uri = process.env.MONGODB_URI || 'mongodb+srv://lamtvu:T_lam1903@cluster0.u8jd7.mongodb.net/busap?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

historyManagement(app)
userManagement(app)
busStopManagement(app)
busesManagement(app)


app.listen(port, ()=>{ console.log(`listen on ${port}`)})


