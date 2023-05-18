const BadRequestErr = require('./bad-request-err');
const NotFoundErr = require('./not-found-err');
const UnauthorizedErr = require('./unauthorized-err');
const ConflictErr = require('./conflict-err');
const ForbiddenErr = require('./forbidden-err');

module.exports = {
  BadRequestErr,
  NotFoundErr,
  UnauthorizedErr,
  ConflictErr,
  ForbiddenErr,
};
