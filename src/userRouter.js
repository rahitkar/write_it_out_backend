const express = require('express');

const { attachPoemsData, getPoemsData, addPoemData } = require('./userHandler');

const userRouter = express.Router();

userRouter.use((req, res, next) => {
  console.log(req.url);
  next();
});

userRouter.use(attachPoemsData);
userRouter.get('/fetchPoemsData', getPoemsData);
userRouter.post('/addPoemData', addPoemData);

module.exports = { userRouter };
