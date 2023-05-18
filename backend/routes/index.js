const router = require('express').Router();
const { celebrate } = require('celebrate');

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../validation');

router.post(
  '/signup',
  celebrate(createUserValidation),
  createUser,
);
router.post(
  '/signin',
  celebrate(loginValidation),
  login,
);

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

module.exports = router;
