const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { urlValidate } = require('../utils/variables');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(value) { return urlValidate.test(value); },
      message: 'Не верный формат ссылки!',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) { return isEmail(value); },
      message: 'Введена не корректная почта!',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
