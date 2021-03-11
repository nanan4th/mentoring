require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./models')
const multer = require('multer')
var cors = require('cors')

db.sequelize.sync({ });

//routes
const userRoute = require('./routes/user.routes')
const mentorRoute = require('./routes/mentor.routes')
const muRoute = require('./routes/mentoruser.routes')
const errorHandler = require('./utils/errorHandler')

//body parser
// app.use((req, res, next) => {
//     req.setHeader('Access-Control-Allow-Origin','*');
//     req.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
//     req.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
//     next();
// })
app.use(cors())
app.use(express.json())
app.use(express.urlencoded( {extended:true}))

//route
app.use('/user',userRoute)
app.use('/mentor',mentorRoute)
app.use('/mu', muRoute)
app.use(errorHandler)


app.use('/', (req, res) => {
    res.send({
        message: "successfully running"
    })
})

const PORT = process.env.APP_PORT || 4000
app.listen(PORT, () => {
    console.log(`app is running at port ${PORT}`)
})