const router = require('express').Router()
const userController = require('../controllers/user.controller')
const joiMiddleware = require("../middlewares/joiValidator")
const jwtMiddleware = require("../middlewares/jwtAuth")

router.post('/register', userController.uploadImage, joiMiddleware, userController.registerUser)

router.post('/login', userController.login)

router.get('/users', jwtMiddleware, userController.findAll)

router.get('/:id', userController.findOne)

router.put('/profile/topUp/:id', userController.topUp)

router.put('/update/:id', joiMiddleware, userController.uploadImage, userController.update)

// router.put('/update/password/:id', joiMiddleware, userController.updatePassword)

router.delete('/delete/:id', userController.delete)

module.exports=router