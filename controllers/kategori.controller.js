const Kategori = require('../models').kategori
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const multer = require('multer')

//register
function createKategori(req, res, next) {
    Kategori.create(req.body)
        .then((data) => {
            res.status(200).json({ data })
        })
        .catch((err) => {
            if (err.name == 'SequelizeUniqueConstraintError') {
                const failResponse = {
                    success: 'false',
                    error: {
                        details: _.map(err.errors, ({ message, type }) => ({
                            message,
                            type
                        }))
                    }
                }
                return res.status(422).json(failResponse)
            }
            return next(err)
        })
}

function findAll(req, res, next) {
    Kategori.findAll()
    .then( (data) => {
        res.status(200).json({ status: "success",data})
    })
    .catch((err) => {
        return next(err)
    })
}

module.exports = {
    createKategori,
    findAll
}
