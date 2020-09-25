const Posts = require('./models/Posts');

const isLoggedIn = async (req, res, next) => {
  const { sessions } = req.app.locals;
  const { sId } = req.cookies;
  const userId = sessions.getSession(sId);
  if (userId) {
    req.userId = userId;
    const posts = await req.app.locals.db.getPoemsData();
    req.app.locals.posts = new Posts(posts || []);
    return next();
  }
  res.redirect(process.env.ReactServer || '/');
};

const getPoemsData = (req, res) => {
  const { posts } = req.app.locals.posts;
  res.json(posts);
};

const addPoemData = (req, res) => {
  const { db, posts } = req.app.locals;
  const updatedPosts = posts.addPost(req.body, req.userId);
  db.setPoemsData(updatedPosts).then(() => res.end());
};

const getUserDetails = (req, res) => {
  const { db } = req.app.locals;
  const { userId } = req.params;
  db.getUser(userId).then((user) => {
    res.json(user);
  });
};

const getUserPoems = (req, res) => {
  const { userId } = req.params;
  const { db } = req.app.locals;
  db.getUserPoems(userId).then((filteredPoems) => res.json(filteredPoems));
};

const updateLikes = (req, res) => {
  const { postId } = req.params;
  const { db } = req.app.locals;
  const { userId } = req;
  db.updateLikes(postId, userId).then(() => res.end());
};

const getLikes = (req, res) => {
  const { postId } = req.params;
  const { db } = req.app.locals;
  db.getLikes(postId).then((likes) => res.json(likes));
};

const addComment = (req, res) => {
  const { comment } = req.body;
  const { postId } = req.params;
  const { db } = req.app.locals;
  const { userId } = req;
  db.addComment(comment, postId, userId).then((comments) => res.json(comments));
};

const getComments = (req, res) => {
  const { postId } = req.params;
  const { db } = req.app.locals;
  db.getComments(postId).then((comments) => res.json(comments));
};

const logout = (req, res) => {
  const { sessions } = req.app.locals;
  const { sId } = req.cookies;
  sessions.clearSession(sId);
  res.clearCookie('sId');
  res.end();
};

module.exports = {
  isLoggedIn,
  getPoemsData,
  addPoemData,
  getUserDetails,
  getUserPoems,
  updateLikes,
  getLikes,
  addComment,
  getComments,
  logout,
};
