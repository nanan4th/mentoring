const router = require('express').Router()
const categoryController = require('../controllers/category.controller')
const joiMiddleware = require("../middlewares/joiValidator")

router.post('/newCategory', joiMiddleware, categoryController.category)

router.get('/categories', categoryController.findAll)

module.exports = router
