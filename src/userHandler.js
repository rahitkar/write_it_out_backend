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
    user: {
      name: 'Rahit',
      url:
        'https://avatars3.githubusercontent.com/u/58026094?s=400&u=0a5dfc215ccfb7149d4c1486bda61880f68a9a72&v=4',
    },
    ...req.body,
    likes: [],
    comments: [],
  });
  db.setPoemsData(poemsData).then(() => res.end());
};

module.exports = { attachPoemsData, getPoemsData, addPoemData };
