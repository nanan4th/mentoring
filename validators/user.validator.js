const joi = require("joi")

const email = joi.string().email()
const name = joi.string().regex(/^[a-z A-Z]+$/)
const username = joi.string().alphanum()
const password = joi.string().min(8).strict()

const registerSchema = joi.object().keys({
    email: email.required(),
    name: name.required(),
    username: username.required(),
    address: name,
    password: password.required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required().strict(),
})

module.exports = {
    "register": registerSchema
}