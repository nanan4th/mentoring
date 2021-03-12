const router = require('express').Router()
const muController = require('../controllers/mentoruser.controller')

router.post('/connect', muController.connection)

module.exports=router