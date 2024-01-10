const Joi = require('joi');

module.exports.createBlogSchema = Joi.object({
    title: Joi.string().required(),
    briefDescription: Joi.string(),
    image: Joi.string(),
    body: Joi.string().required(),
});

module.exports.updateBlogSchema = Joi.object({
    title: Joi.string(),
    briefDescription: Joi.string(),
    image: Joi.string(),
    body: Joi.string(),
});