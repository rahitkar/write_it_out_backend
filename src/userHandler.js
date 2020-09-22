const isLoggedIn = (req, res, next) => {
  const { sessions } = req.app.locals;
  const { sId } = req.cookies;
  if (sessions.getSession(sId)) {
    return next();
  }
  console.log('redirecting');
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
    likes: [],
    comments: [],
  });
  db.setPoemsData(poemsData).then(() => res.end());
};

const getUserDetails = function (req, res) {
  const { db } = req.app.locals;
  const { userId } = req.params;
  db.getUser(userId).then((user) => {
    res.json(user);
  });
};

module.exports = {
  isLoggedIn,
  attachPoemsData,
  getPoemsData,
  addPoemData,
  getUserDetails,
};
