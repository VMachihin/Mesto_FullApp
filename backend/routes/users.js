const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getAllUsers,
  getUserById,
  editProfile,
  editAvatar,
  getUserInfo,
} = require('../controllers/users');
const { userIdValidation, editProfileValidation, editAvatarValidation } = require('../validation');

usersRouter.get('/', getAllUsers);
usersRouter.get('/me', getUserInfo);
usersRouter.get(
  '/:userId',
  celebrate(userIdValidation),
  getUserById,
);
usersRouter.patch(
  '/me',
  celebrate(editProfileValidation),
  editProfile,
);
usersRouter.patch(
  '/me/avatar',
  celebrate(editAvatarValidation),
  editAvatar,
);

module.exports = usersRouter;
