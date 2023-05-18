const mongoose = require('mongoose');

const cardsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // чтобы получить доступ к данным пользователей, связанных с этими идентификаторами, необходимо добавить параметр ref: 'user' в поле схемы
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // чтобы получить доступ к данным пользователей, связанных с этими идентификаторами, необходимо добавить параметр ref: 'user' в поле схемы
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardsSchema);
