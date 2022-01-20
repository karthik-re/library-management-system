const Joi = require("joi")

const schema = Joi.object({
    bookId:Joi.number().required(),
    studentId:Joi.number().required(),
    outDate:Joi.date().required(),
    returnDate:Joi.date()
})

module.exports = schema;