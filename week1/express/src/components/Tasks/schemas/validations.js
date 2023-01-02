const Joi = require('joi');

const taskSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(30)
        .required(),
    description: Joi.string()
        .min(3)
        .max(50),
    estimateTime: Joi.number().integer().positive().required(),
    createBy: Joi.string()
        .alphanum(),
    token: [
        Joi.string(),
        Joi.number(),
        Joi.required(),
    ],
}).with('title', 'estimateTime');

const updateEstimateSchema = Joi.object({
    estimateTime: Joi.number().integer().positive().required(),
})
module.exports = {
    taskSchema,
    updateEstimateSchema,
};
