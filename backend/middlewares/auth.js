const jwt = require('jsonwebtoken');
const { UnauthorizedErr } = require('../errors');

require('dotenv').config();

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedErr('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    next(new UnauthorizedErr('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};
