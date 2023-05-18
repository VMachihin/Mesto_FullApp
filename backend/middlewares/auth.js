const jwt = require('jsonwebtoken');
const { UnauthorizedErr } = require('../errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedErr('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'secretKey');
  } catch {
    next(new UnauthorizedErr('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};
