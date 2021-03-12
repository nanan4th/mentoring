const joi = require("joi")

const category = joi.string().equal("Programming", "Musik", "Desain", "Bahasa", "Matematika")

const categorySchema = joi.object().keys({
   kategori: category.required()
})

module.exports = {
    "category": categorySchema
}