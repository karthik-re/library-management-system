const Joi = require('joi');

const bookSchema = Joi.object({
    bookTitle:Joi.string().required(),
    bookAuthor:Joi.string().required()
})

module.exports = bookSchema;