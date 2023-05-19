const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { centralizedErrorHandler } = require('./utils/centralized-error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFoundErr } = require('./errors/not-found-err');
const cors = require('./middlewares/cors');

const router = require('./routes');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(requestLogger);
app.use(cors);

// удалить этот код после успешного прохождения ревью
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);

app.use((req, res, next) => {
  next(new NotFoundErr('Не корректный путь'));
});

app.use(errorLogger);

app.use(errors());

app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
