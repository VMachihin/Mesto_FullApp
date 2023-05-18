const { Joi } = require('celebrate');
const { urlValidate } = require('../utils/variables');

const createUserValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlValidate),
  }),
};

const userIdValidation = {
  params: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
};

const editProfileValidation = {
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
};

const editAvatarValidation = {
  body: Joi.object({
    avatar: Joi.string().regex(urlValidate).required(),
  }),
};

const createCardValidation = {
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string()
      .regex(urlValidate)
      .required(),
  }),
};

const cardIdValidation = {
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
};

module.exports = {
  createUserValidation,
  userIdValidation,
  editProfileValidation,
  editAvatarValidation,
  createCardValidation,
  cardIdValidation,
  loginValidation,
};
