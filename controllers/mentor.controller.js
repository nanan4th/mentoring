const Mentor = require('../models').mentors
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const multer = require("multer")

const PUBLIC_PATH = process.env.PUBLIC_PATH || '.';

const uploadImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if(file.fieldname==="profileImage"){
                cb(null, './uploads/mentorProfile/imageProfile')
            } else if (file.fieldname==="cvImage") {
                cb(null, './uploads/mentorProfile/cv')
            }
        },
        filename: (req, file, cb) => {
            cb(null, new Date().getTime().toString() + '-' + file.originalname.replace(/\s/g, ''))
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if(file.fieldname==="profileImage"){
            if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
                cb(null, true)
            } else {
                cb(null, false)
            }
        } else if (file.fieldname==="cvImage"){
            if (file.mimetype === 'application/pdf') {
                cb(null, true)
            } else {
                cb(null, false)
            }
        }
    }
}).fields([
    {
        name:'profileImage',maxCount:1
    },
    {
        name:'cvImage',maxCount:1
    }
])

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
        kategoriId: req.body.kategoriId,
        cvImage: req.files.cvImage[0].filename,
        profileImage: req.files.profileImage[0].filename,
        password: req.body.password
    })
        .then((data) => {
            let payload = {
                id: data.id,
                email: data.email,
                role: "mentor"
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
    Mentor.findOne({ where: { email: req.body.email } })
        .then((data) => {
            bcrypt.compare(req.body.password, data.password, (err, result) => {
                if (err) {
                    return next(err)
                }
                if (result) {
                    let payload = {
                        id: data.id,
                        email: data.email,
                        role: "mentor"
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
    Mentor.findAll({ where: { kategoriId: req.params.kategoriId } })
        .then((mentors) => {
            res.status(200).json({ mentors })
        })
        .catch((err) => {
            return next(err)
        })
}

//withdraw
function withdraw(req, res, next) {
    Mentor.findOne({ where: { id: req.params.id } })
        .then((data) => {
            if (req.body.money < 1) {
                return res.status(500).json({
                    success: false,
                    message: "Tolong masukkan nominal yang benar"
                })
            }
            if (data.money - req.body.money < 0) {
                return res.status(500).json({
                    success: false,
                    message: "Saldo utama tidak mencukupi"
                })
            }
            Mentor.update({ money: data.money - req.body.money }, { where: { id: req.params.id } })
                .then(() => {
                    if (data.money < 0) {
                        return next(err)
                    }
                    res.status(200).json({
                        success: true,
                        message: "Proses withdraw berhasil"
                    })
                })
        })
        .catch((err) => {
            return next(err)
        })
}

//findAll 
function findAll(req, res, next) {
    Mentor.findAll()
        .then((mentors) => {
            res.status(200).json({ mentors })
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

//update
function update(req, res, next) {
    Mentor.update({
        name: req.body.name,
        occupation: req.body.occupation,
        kategoriId: req.body.kategoriId,
        address: req.body.address,
        method: req.body.method,
        about: req.body.about,
        rate: req.body.rate,
        profileImage: req.files.profileImage[0].filename
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
    uploadImage,
    login,
    explore,
    withdraw,
    findAll,
    findOne,
    update,
    delete: _delete
}
