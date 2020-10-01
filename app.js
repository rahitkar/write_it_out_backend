const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { userRouter } = require('./src/userRouter');

const {
  processGithubOauth,
  getLoginLink,
  getUserId,
} = require('./src/handlers');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build')));
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use('/api/user', userRouter);

app.get('/api/getLoginLink', getLoginLink);

app.get('/api/getUserId', getUserId);

app.get('/user', processGithubOauth);

app.get('/*', function (req, res) {
  console.log(path.join(__dirname, '../build', 'index.html'));
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = { app };
