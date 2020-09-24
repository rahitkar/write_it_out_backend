const express = require('express');
const {
  isLoggedIn,
  getPoemsData,
  addPoemData,
  getUserDetails,
  getUserPoems,
  updateLikes,
  getLikes,
  addComment,
} = require('./userHandler');

const userRouter = express.Router();

userRouter.use((req, res, next) => {
  console.log(req.url);
  next();
});
userRouter.use(isLoggedIn);
userRouter.get('/fetchPoemsData', getPoemsData);
userRouter.post('/addPoemData', addPoemData);
userRouter.get('/getUserDetails/:userId', getUserDetails);
userRouter.get('/getUserPoems/:userId', getUserPoems);
userRouter.get('/updateLike/:postId', updateLikes);
userRouter.get('/getLikes/:postId', getLikes);
userRouter.get('/addComment/:postId', addComment);

module.exports = { userRouter };
