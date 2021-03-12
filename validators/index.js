const userValidator = require("./user.validator")
const mentorValidator = require("./mentor.validator")
const categoryValidator = require("./category.validator")

module.exports = {
    "user": userValidator,
    "mentor": mentorValidator,
    "category": categoryValidator
}