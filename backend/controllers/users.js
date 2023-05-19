const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/users');
const {
  BadRequestErr,
  NotFoundErr,
  UnauthorizedErr,
  ConflictErr,
} = require('../errors');

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ users });
    })

    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })

    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('Пользователь с указанным id не найден.');
      }

      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr('Введены не корректные данные.'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    })
      .then((newUser) => {
        const newUserNoPassword = newUser.toObject();
        delete newUserNoPassword.password;

        res.status(201).send(newUserNoPassword);
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictErr('Пользователь с такой почтой уже существует.'));
        } else if (err.name === 'ValidationError') {
          next(
            new BadRequestErr(
              'Переданы некорректные данные при создании пользователя',
            ),
          );
        } else {
          next(err);
        }
      });
  });
};

const editProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((newData) => {
      if (!req.user._id) {
        throw new NotFoundErr('Пользователь с указанным id не найден.');
      }

      res.send(newData);
    })
    .catch(next);
};

const editAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((userData) => {
      if (!req.user._id) {
        throw new NotFoundErr('Пользователь с указанным id не найден.');
      }

      res.send(userData);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password') // команда добавляет в объект user хэш пароля
    .then((user) => {
      if (!user) {
        throw new UnauthorizedErr('Не правильная почта или пароль!');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedErr('Не правильная почта или пароль!');
        }

        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
          expiresIn: '10d',
        });
        res
          .send({ token, message: 'Вход выполнен!' });
      });
    })
    .catch(next);
};

module.exports = {
  getAllUsers,
  getUserInfo,
  getUserById,
  createUser,
  editProfile,
  editAvatar,
  login,
};
