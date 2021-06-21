const express = require('express')
const mongoose = require('mongoose')
const port = process.env.PORT || 3002
const app = express()

const initRoter = require('./routers/router')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// const uri = 'mongodb://localhost:27017/busap'
const uri = process.env.MONGODB_URI || 'mongodb+srv://lamtvu:T_lam1903@cluster0.u8jd7.mongodb.net/busap?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

initRoter(app)

app.listen(port, ()=>{ console.log(`listen on ${port}`)})


