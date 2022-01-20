const Joi = require('joi');

const studentSchema = Joi.object({
    studentName:Joi.string().required()
})

module.exports = studentSchema;