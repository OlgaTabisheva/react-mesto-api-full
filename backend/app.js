const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const { userRouter } = require('./routes/user');
const { cardRouter } = require('./routes/card');
const auth = require('./middlewares/auth');
const { urlRegex } = require('./utils');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors')

const app = express();
const { PORT = 3000 } = process.env;
const { createUser, login } = require('./controllers/users');

app.use(express.json());

const corsOptions = {
  origin: 'http://iamthebest.front.nomoredomains.xyz',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//app.use(cors(corsOptions))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Allow-Methods", "*");

  if (req.method==='OPTIONS')
     return res.send();
  else
    next();
});

app.use(requestLogger);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().optional().min(2).max(30),
    about: Joi.string().optional().min(2).max(30),
    avatar: Joi.string().pattern(urlRegex).allow('').optional(),

  }),
}), createUser);

app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);
app.use('/', auth, (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message,
    });
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.listen(PORT, () => {
  console.log('Сервер запущен');
});
