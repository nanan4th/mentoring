const router = require('express').Router()
const categoryController = require('../controllers/kategori.controller')
const kategoriMiddleware = require("../middlewares/kategoriMiddleware")

router.post('/newCategory', kategoriMiddleware, categoryController.createKategori)

router.get('/categories', categoryController.findAll)

module.exports = router
