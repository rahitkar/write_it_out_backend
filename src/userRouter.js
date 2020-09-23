const express = require('express');
const {
  isLoggedIn,
  attachPoemsData,
  getPoemsData,
  addPoemData,
  getUserDetails,
  getUserPoems,
} = require('./userHandler');

const userRouter = express.Router();

userRouter.use((req, res, next) => {
  console.log(req.url);
  next();
});
userRouter.use(isLoggedIn);
userRouter.use(attachPoemsData);
userRouter.get('/fetchPoemsData', getPoemsData);
userRouter.post('/addPoemData', addPoemData);
userRouter.get('/getUserDetails/:userId', getUserDetails);
userRouter.get('/getUserPoems/:userId', getUserPoems);

module.exports = { userRouter };
