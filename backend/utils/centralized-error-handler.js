const routeNotFound = (req, res) => {
  res.status(404).send({
    message: 'Не корректный URL',
  });
};

const centralizedErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'Сервер недоступен' : message });

  next();
};

module.exports = { routeNotFound, centralizedErrorHandler };
