const router = require('express').Router()
const userController = require('../controllers/user.controller')
const joiMiddleware = require("../middlewares/joiValidator")
const jwtMiddleware = require("../middlewares/jwtAuth")

router.post('/register', joiMiddleware, userController.registerUser)

router.post('/login', userController.login)

router.get('/users', jwtMiddleware, userController.findAll)

router.get('/:id', userController.findOne)

router.put('/:id', userController.update)

router.delete('/delete/:id', userController.delete)

module.exports=router