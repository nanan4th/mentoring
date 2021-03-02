const userValidator = require("./user.validator")
const mentorValidator = require("./mentor.validator")

module.exports = {
    "user": userValidator,
    "mentor": mentorValidator
}