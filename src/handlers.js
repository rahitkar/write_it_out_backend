const axios = require('axios');
const { CLIENT_ID, CLIENT_SECRET } = process.env;

const generateUserInfoConfig = function (accessToken) {
  return {
    url: 'https://api.github.com/user',
    headers: {
      Authorization: `token ${accessToken}`,
      accept: 'application/json',
    },
  };
};

const generateAccessTokenConfig = function (code) {
  return {
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
    headers: {
      accept: 'application/json',
    },
  };
};

const processGithubOauth = function (req, res) {
  const { db, sessions } = req.app.locals;
  const { code } = req.query;
  axios(generateAccessTokenConfig(code)).then(({ data }) => {
    const accessToken = data['access_token'];
    axios(generateUserInfoConfig(accessToken)).then(({ data }) => {
      const { name, avatar_url, id } = data;
      res.cookie('sId', sessions.createSession(data.id));
      db.addPoet({ name, url: avatar_url }, id).then(
        res.redirect(process.env.reactServer || '/')
      );
    });
  });
};

const getLoginLink = function (req, res) {
  res.json({
    loginLink: `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`,
  });
};

const getUserId = function (req, res) {
  const { sId } = req.cookies;
  const { sessions } = req.app.locals;
  const id = sessions.getSession(sId);
  if (id) {
    return res.json({ loggedInUserId: id });
  }
  res.json({ loggedInUserId: null });
};

module.exports = { processGithubOauth, getLoginLink, getUserId };
