const request = require('supertest');
const { app } = require('../app');

describe('/api/user/* ', () => {
  it('any request of "/api/user/" should redirect to localhost:3000 if no session is present', (done) => {
    const sessions = {};
    sessions.createSession = () => '123';
    sessions.getSession = () => undefined;
    app.locals.sessions = sessions;
    request(app).get('/api/user/wxyz').expect(302, done);
  });
});

describe('any request of /api/user/ with session id present', () => {
  beforeEach(() => {
    const db = {};
    db.getPoemsData = () => {
      return new Promise((resolve, rej) => {
        resolve([]);
      });
    };

    db.setPoemsData = () => {
      return new Promise((resolve, rej) => {
        resolve(true);
      });
    };

    db.addPoemData = () => {
      return new Promise((resolve, rej) => {
        resolve(true);
      });
    };

    db.getUser = (id) => {
      return new Promise((resolve, rej) => {
        if (id) {
          resolve({ user: 'user' });
        }
      });
    };

    db.getUserPoems = (userId) => {
      return new Promise((resolve, rej) => {
        if (userId) {
          resolve({ poems: [] });
        }
      });
    };

    db.updateLikes = (postId) => {
      return new Promise((resolve, rej) => {
        if (postId) {
          resolve(true);
        }
      });
    };

    db.getLikes = (postId) => {
      return new Promise((resolve, rej) => {
        if (postId) {
          resolve({ likes: [] });
        }
      });
    };

    const sessions = {};
    sessions.createSession = () => '123';
    sessions.getSession = () => '12345';
    app.locals.sessions = sessions;
    app.locals.db = db;
  });

  describe('/api/user/fetchPoemsData', () => {
    it('should get poemsData', (done) => {
      request(app)
        .get('/api/user/fetchPoemsData')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('/api/user/addPoemData', () => {
    it('should add poemData', (done) => {
      request(app)
        .post('/api/user/addPoemData')
        .send({ data: 'poemData' })
        .expect(200, done);
    });
  });

  describe('/api/user/getUserDetails/:userId', () => {
    it('should get userDetails for given userId', (done) => {
      request(app)
        .get('/api/user/getUserDetails/1')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('/getUserPoems/:userId', () => {
    it("should get user's poems for given userId", (done) => {
      request(app)
        .get('/api/user/getUserPoems/1')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('/updateLike/:postId', () => {
    it('should update likes of the poem having given userId', (done) => {
      request(app).get('/api/user/updateLike/1').expect(200, done);
    });
  });

  describe('/getLikes/:postId', () => {
    it('should get likes of the poem having given userId', (done) => {
      request(app)
        .get('/api/user/getLikes/1')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
