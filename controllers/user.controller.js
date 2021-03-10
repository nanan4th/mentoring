const User = require('../models').users
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const multer = require('multer')

const uploadImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/userProfile/')
        },
        filename: (req, file, cb) => {
            cb(null, new Date().getTime().toString() + '-' + file.originalname.replace(/\s/g, ''))
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
})

//register
function registerUser(req, res, next) {
    User.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    })
        .then((data) => {
            let payload = {
                id: data.id,
                email: data.email
            }
            const token = jwt.sign(payload, process.env.JWT_TOKEN)
            res.status(200).json({ data, token })
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

//login
function login(req, res, next) {
    User.findOne({ where: { email: req.body.email } })
        .then((data) => {
            bcrypt.compare(req.body.password, data.password, (err, result) => {
                if (err) {
                    return next(err)
                }
                if (result) {
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    const token = jwt.sign(payload, process.env.JWT_TOKEN)
                    res.status(200).json({ auth: true, token })
                }
            })
        })
        .catch((err) => {
            return next(err)
        })
}

//topUp
function topUp(req, res, next) {
    User.findOne({ where: { id: req.params.id } })
        .then((data) => {
            if (req.body.money < 1) {
                res.status(500).json({
                    success: false,
                    message: "Tolong masukkan nominal yang benar"
                })
            }
            User.update({ money: req.body.money + data.money }, { where: { id: req.params.id } })
                .then(() => {
                    res.status(200).json({
                        success: true,
                        message: "Proses TopUp berhasil"
                    })
                })
        })
        .catch((err) => {
            return next(err)
        })
}

//findAll 
function findAll(req, res, next) {
    User.findAll()
        .then((users) => {
            res.status(200).json({ users })
        })
        .catch((err) => {
            return next(err)
        })
}

//findOne
function findOne(req, res, next) {
    const id = req.params.id
    User.findByPk(id)
        .then((data) => {
            res.json(data)
            if (data == null) {
                next("User with id is not found")
            }
        })
        .catch((err) => {
            return next(err)
        })
}

//update
function update(req, res, next) {
    User.update({
        name: req.body.name,
        username: req.body.name,
        address: req.body.address,
        profileImage: req.file.filename,
    }, { where: { id: req.params.id } })
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Update Successful"
            })
        })
        .catch((err) => {
            return next(err)
        })
}

//delete
function _delete(req, res, next) {
    const id = req.params.id
    let condition = {
        id: id
    }
    User.destroy({ where: condition })
        .then(num => {
            if (num != 1) {
                return next(err)
            }
            res.status(200).send({
                message: "Delete successful"
            })
        })
        .catch(err => {
            return next(err)
        })
}

module.exports = {
    registerUser,
    uploadImage: uploadImage.single("profileImage"),
    login,
    topUp,
    findAll,
    findOne,
    update,
    delete: _delete
}