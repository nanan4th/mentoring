const Mentor = require('../models').mentors
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: './uploads/mentorProfile',
    filename: function(req, file, cb) {
        cb(null, Date.now()+file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
});

//register
function registerMentor(req, res, next) {
    Mentor.create(req.body)
        .then((data) => {
            let payload = {
                id: data.id,
                email: data.email
            }
            const token = jwt.sign(payload, process.env.JWT_TOKEN)
            res.status(200).send({ data, token })
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
                return res.status(422).send(failResponse)
            }
            return next(err)
        })
}

//login
function login(req, res, next) {
    Mentor.findOne({ where: {email: req.body.email}})
        .then((data) => {
            bcrypt.compare(req.body.password, data.password, (err, result) => {
                let payload = {
                    id: data.id,
                    email: data.email
                }
                const token = jwt.sign(payload, process.env.JWT_TOKEN)
                res.status(200).send({ auth: true, token })
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
            res.status(200).send({mentors})
        })
        .catch((err) => {
            return next(err)
        })
}

//findAll 
function findAll(req, res, next) {
    Mentor.findAll()
        .then((mentors) => {
            res.status(200).send({ users: mentors })
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
            res.send(data)
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
            res.status(200).send({
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
            res.status(200).send({
                message: "Delete successful"
            })
        })
        .catch(err => {
            return next(err)
        })
}

module.exports = {
    registerMentor,
    upload,
    login,
    explore,
    findAll,
    findOne,
    update,
    delete: _delete
}