const express = require('express');
const cookieParser = require('cookie-parser');
const { Sessions } = require('./sessions');
const Database = require('./database');
const { getRedisClient } = require('./redisClient');
const { userRouter } = require('./userRouter');

const { processGithubOauth, getUser } = require('./handlers');

const app = express();
const redisClient = getRedisClient();
const db = new Database(redisClient);
app.locals.db = db;
app.locals.sessions = new Sessions();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use((req, res, next) => {
  console.log(req.url, req.cookies);
  next();
});

app.use('/api/user', userRouter);

app.get('/api/getUser', getUser);

app.get('/user', processGithubOauth);

module.exports = { app };
