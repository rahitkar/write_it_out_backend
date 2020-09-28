const express = require('express');
const cookieParser = require('cookie-parser');
const { userRouter } = require('./userRouter');

const { processGithubOauth, getLoginLink, getUserId } = require('./handlers');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

app.use('/api/user', userRouter);

app.get('/api/getLoginLink', getLoginLink);

app.get('/api/getUserId', getUserId);

app.get('/user', processGithubOauth);

module.exports = { app };
