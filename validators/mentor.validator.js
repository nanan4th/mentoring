const joi = require("joi")
const { category } = require("../controllers/category.controller")

const email = joi.string().email()
const address = joi.string()
const name = joi.string().regex(/^[a-z A-Z]+$/)
const method = joi.string().equal("Tatap muka", "Online")
const about = joi.string().regex(/^[a-z A-Z]+$/).min(30)
const rate = joi.number()
const password = joi.string().min(8).strict()

const registerSchema = joi.object().keys({
    email: email.required(),
    name: name.required(),
    occupation: name.required(),
    address: address.required(),
    method: method.required(),
    about: about.required(),
    rate: rate.required(),
    categoryId: rate.required(),
    password: password.required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required().strict(),
})

module.exports = {
    "register": registerSchema
}