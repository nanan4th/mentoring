const joi = require("joi")

const email = joi.string().email()
const name = joi.string().regex(/^[a-z A-Z]+$/)
const address = joi.string()
const username = joi.string().alphanum()
const password = joi.string().min(8).strict()
const money = joi.number().positive()

const registerSchema = joi.object().keys({
    email: email.required(),
    name: name,
    username: username,
    address: address,
    money: money,
    password: password.required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required().strict(),
})

module.exports = {
    "register": registerSchema
}