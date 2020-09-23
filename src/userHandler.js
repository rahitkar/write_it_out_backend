const isLoggedIn = (req, res, next) => {
  const { sessions } = req.app.locals;
  const { sId } = req.cookies;
  const userId = sessions.getSession(sId);
  if (userId) {
    req.userId = userId;
    return next();
  }
  res.redirect('http://localhost:3000');
};

const attachPoemsData = (req, res, next) => {
  req.app.locals.db
    .getPoemsData()
    .then((poemsData) => {
      req.app.locals.poemsData = poemsData || [];
    })
    .then(next);
};

const getPoemsData = (req, res) => {
  res.json(JSON.stringify(req.app.locals.poemsData));
};

const addPoemData = (req, res) => {
  const { poemsData, db } = req.app.locals;
  poemsData.unshift({
    id: poemsData.length,
    ...req.body,
    userId: req.userId,
    likes: [],
    comments: [],
  });
  db.setPoemsData(poemsData).then(() => res.end());
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
  const { poemsData } = req.app.locals;
  const [post] = poemsData.filter((poemData) => poemData.id === +postId);
  res.json(post.likes);
};

module.exports = {
  isLoggedIn,
  attachPoemsData,
  getPoemsData,
  addPoemData,
  getUserDetails,
  getUserPoems,
  updateLikes,
  getLikes,
};
