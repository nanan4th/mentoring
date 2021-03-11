const router = require('express').Router()
const muController = require('../controllers/mentoruser.controller')

router.post('/payment', muController.payment)

module.exports=router