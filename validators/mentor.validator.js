const joi = require("joi")

const email = joi.string().email()
const address = joi.string()
const name = joi.string().regex(/^[a-z A-Z]+$/)
const about = joi.string().regex(/^[a-z A-Z]+$/).min(30)
const rate = joi.number()
const password = joi.string().min(8).strict()
const money = joi.number().positive()

const registerSchema = joi.object().keys({
    email: email.required(),
    name: name.required(),
    occupation: name.required(),
    category: name.required(),
    address: address.required(),
    method: name.required(),
    about: about.required(),
    rate: rate.required(),
    money: money,
    password: password.required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required().strict(),
})

module.exports = {
    "register": registerSchema
}