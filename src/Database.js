const updatePostLikes = (poemsData, postId, userId) => {
  const poemsDataClone = poemsData.slice();
  poemsDataClone.forEach((poemData) => {
    if (poemData.id === +postId) {
      if (poemData.likes.includes(userId)) {
        poemData.likes = poemData.likes.filter(
          (userWhoLiked) => userWhoLiked !== userId
        );
        return;
      }
      poemData.likes.unshift(userId);
    }
  });
  return poemsDataClone;
};

class Database {
  constructor(db) {
    this.db = db;
  }

  getPoemsData() {
    return new Promise((resolve, reject) => {
      this.db.get('poemsData', (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(JSON.parse(res));
      });
    });
  }

  setPoemsData(poemsDetails) {
    return new Promise((resolve, reject) => {
      this.db.set('poemsData', JSON.stringify(poemsDetails), (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }

  addPoet(details, id) {
    return new Promise((resolve, reject) => {
      this.db.hset('users', id, JSON.stringify(details), (err) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      });
    });
  }

  getUser(id) {
    return new Promise((resolve, reject) => {
      this.db.hget('users', id, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }

  getUserPoems(userId) {
    return new Promise((resolve, reject) => {
      this.getPoemsData().then((poemsData) => {
        const data = poemsData || [];
        const filteredPoems = data.filter((pData) => {
          return pData.userId === +userId;
        });
        resolve(filteredPoems);
      });
    });
  }
  
  updateLikes(postId, userId) {
    return new Promise((resolve, rej) => {
      this.getPoemsData().then((poemsData) => {
        const updatedPoemsData = updatePostLikes(poemsData, postId, userId);
        this.setPoemsData(updatedPoemsData).then(resolve);
      });
    });
  }
}

module.exports = Database;
