const Mentor = require('../models').mentors
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const multer = require("multer")

const uploadImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/mentorProfile/')
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
function registerMentor(req, res, next) {
    Mentor.create({
        email: req.body.email,
        name: req.body.name,
        occupation: req.body.occupation,
        category: req.body.category,
        address: req.body.address,
        method: req.body.method,
        about: req.body.about,
        rate: req.body.rate,
        profileImage: req.file.filename,
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
    Mentor.findOne({ where: {email: req.body.email}})
    .then((data) => {
        bcrypt.compare(req.body.password, data.password, (err, result) => {
            if(err){
                return next(err)
            }
            if(result){
                let payload = {
                    id: data.id,
                    email: data.email,
                    username: data.username
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

//explore
function explore(req, res, next) {
    Mentor.findAll({where: {category: req.body.category}})
        .then( (mentors) => {
            res.status(200).json({mentors})
        })
        .catch((err) => {
            return next(err)
        })
}

//findAll 
function findAll(req, res, next) {
    Mentor.findAll()
        .then((mentors) => {
            res.status(200).json({ users: mentors })
        })
        .catch((err) => {
            return next(err)
        })
}

//findOne
function findOne(req, res, next) {
    const id = req.params.id
    Mentor.findByPk(id)
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

//updateOne
function update(req, res, next) {
    const id = req.params.id
    let condition = {
        id: id
    }
    Mentor.update(req.body, { where: condition })
        .then(num => {
            if (num != 1) {
                return next(err)
            }
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
    Mentor.destroy({ where: condition })
        .then(num => {
            if (num != 1) {
                return next(err)
            }
            res.status(200).json({
                message: "Delete successful"
            })
        })
        .catch(err => {
            return next(err)
        })
}

module.exports = {
    registerMentor,
    uploadImage: uploadImage.single("profileImage"),
    login,
    explore,
    findAll,
    findOne,
    update,
    delete: _delete
}