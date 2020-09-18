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

  setPoemsData(todoDetails) {
    return new Promise((resolve, reject) => {
      this.db.set('poemsData', JSON.stringify(todoDetails), (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }
}

module.exports = Database;
