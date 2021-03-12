const Category = require('../models').categories
const _ = require('lodash')

function category(req, res, next) {
    Category.create(req.body)
    .then( (data) => {
        res.status(200).json({ status: "success",data})
    })
    .catch( (err) => {
        console.log(err)
        return next(err)
    })
}

function findAll(req, res, next) {
    Category.findAll()
    .then( (data) => {
        res.status(200).json({ status: "success",data})
    })
    .catch((err) => {
        return next(err)
    })
}

module.exports = {
    category,
    findAll
}