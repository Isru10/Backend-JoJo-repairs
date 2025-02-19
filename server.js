require('dotenv').config()
require('express-async-error')
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
// this works fine for now just dont use it  
// const corsOptions = {
//     origin:'http://localhost:5173',
//     credentials: true,

    // DONT USE THOSE BELOW 

    // 
    // methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    // allowedHeaders: ['Content-Type'],
    // exposedHeaders: ['Content-Type']



    
    // NEW ONE not working
    // origin: 'http://localhost:5173', // Frontend origin
    // credentials: true, // Allow credentials
    // allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
  
// }

const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

// app.use(cors(corsOptions))
app.use(cors({
    ...corsOptions,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  }));

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.use('/auth', require('./routes/authRoutes'))

app.use('/users', require('./routes/userRoutes'))

app.use('/notes', require('./routes/noteRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})


























// THIS IS THE REAL ONE


// require ('dotenv').config()
// const express = require("express");
// const app = express()
// const path=require("path")
// const {logger} = require("./middleware/logger")
// const errorHandler = require("./middleware/errorHandler")
// const cookieParser = require("cookie-parser")
// const cors = require("cors")
// // const corsOptions = require("./config/corsOptions")
// const corsOptions = {
//     origin: '*',
//     credentials: true,
//     methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
//     allowedHeaders: ['Content-Type'],
//     exposedHeaders: ['Content-Type']
// }
// const connectDB = require("./config/dbConn")
// const mongoose = require("mongoose")
// const {logEvents} = require("./middleware/logger")




// console.log(process.env.NODE_ENV)
// connectDB()





// const PORT=process.env.PORT || 3500 

// app.use(logger)
// app.use(cors(corsOptions))
// app.use(express.json()) 
// app.use(cookieParser())

// app.use('/',express.static(path.join(__dirname,'public')))
// app.use('/',require("./routes/root"))
// app.use('/users',require("./routes/userRoutes"))
// app.use('/doctor',require("./routes/doctorRoutes"))



// app.all('*', (req, res) => {
//     res.status(404)
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'))
//     } else if (req.accepts('json')) {
//         res.json({ message: '404 Not Found' })
//     } else {
//         res.type('txt').send('404 Not Found')
//     }
// })
// app.use(errorHandler)
// mongoose.connection.once('open',()=>{
//     console.log('connected to mongo')
//     app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
// })

// mongoose.connection.on('error',err=>{
//     console.log(err)
//     logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
// })




