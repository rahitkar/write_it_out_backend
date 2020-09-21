const express = require('express');
const Database = require('./database');
const { getRedisClient } = require('./redisClient');
const { userRouter } = require('./userRouter');

const app = express();
const redisClient = getRedisClient();
const db = new Database(redisClient);
app.locals.db = db;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use('/api/user', userRouter);

module.exports = { app };
