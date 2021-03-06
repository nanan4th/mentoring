require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./models')
const multer = require('multer')

db.sequelize.sync({ });

//routes
const userRoute = require('./routes/user.routes')
const mentorRoute = require('./routes/mentor.routes')
const errorHandler = require('./utils/errorHandler')

//body parser
app.use(express.json())
app.use(express.urlencoded( {extended:true}))

//route
app.use('/user',userRoute)
app.use('/mentor',mentorRoute)
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