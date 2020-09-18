const express = require('express');
const fetch = require('node-fetch');
const Database = require('./database');
const { getRedisClient } = require('./redisClient');

const { attachPoemsData, getPoemsData, addPoemData } = require('./handler');

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

app.use(attachPoemsData);

app.get('/api/fetchPoemsData', getPoemsData);
app.post('/api/addPoemData', addPoemData);

module.exports = { app };
