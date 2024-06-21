const Joi = require('joi');

const userValidate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        role: Joi.string().valid('admin', 'user').required(),
        firstName: Joi.string().min(1).max(50).required(),
        lastName: Joi.string().min(1).max(50).required(),
    });

    return schema.validate(data);
};

module.exports = { userValidate };
