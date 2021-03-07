import * as Joi from 'joi';

const object = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
    title: Joi.string(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    phone: Joi.number().required(),
    _password: Joi.string().pattern(new RegExp('^[$]2[abxy]?[$](?:0[4-9]|[12][0-9]|3[01])[$][./0-9a-zA-Z]{53}$')).required(),
});

const array = Joi.array().items(object).unique('id');

export default {
    object,
    array
};
