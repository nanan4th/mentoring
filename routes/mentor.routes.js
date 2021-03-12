const router = require('express').Router()
const mentorController = require('../controllers/mentor.controller')
const joiMiddleware = require("../middlewares/joiValidator")
const jwtMiddleware = require("../middlewares/jwtAuth")

router.post('/register', mentorController.uploadImage, joiMiddleware, mentorController.registerMentor)

router.post('/login', mentorController.login)

router.get('/explore/:kategoriId', mentorController.explore)

router.get('/mentors', jwtMiddleware, mentorController.findAll)

router.get('/:id', mentorController.findOne)

router.put('/profile/withdraw/:id', mentorController.withdraw)

router.put('/update/:id', joiMiddleware, mentorController.uploadImage, mentorController.update)

router.delete('/delete/:id', mentorController.delete)

module.exports=router