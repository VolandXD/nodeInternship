const Joi = require('joi');

const taskSchema = Joi.object({
    title: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    description: Joi.string()
        .alphanum()
        .min(3)
        .max(50),
    estimateTime: Joi.number().integer().positive().required(),
    createBy: Joi.string()
        .alphanum(),
}).with('title', 'estimateTime');

module.exports = {
    taskSchema,
};
