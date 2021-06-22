const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/UserCarrot'
const  authRouter = require('./src/routes/authRoutes')
const cookiePraser = require('cookie-parser')

const app = express()

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})


//middleware
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookiePraser())


// routes
app.use(authRouter)

// cookies
app.get('/set-cookies', (req, res) => {
    // res.setHeader('Set-Cookie', 'newUser=true')
    res.cookie('newUser', false)
    res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true})

    res.send('kamu mendapatkan cookies')

})

// read cookie
app.get('/read-cookies', (req, res) => {
    const cookies = req.cookies
    console.log(cookies)
    res.json(cookies)
})

app.listen(9000, () => {
    console.log('Server started')
})