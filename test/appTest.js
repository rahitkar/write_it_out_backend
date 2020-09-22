const request = require('supertest');
const { app } = require('../src/app');

describe('/api/user/fetchPoemsData', () => {
  it('should redirect to localhost:3000 if no session id is present', (done) => {
    const sessions = {};
    sessions.createSession = () => '123';
    sessions.getSession = () => undefined;
    app.locals.sessions = sessions;
    request(app).get('/api/user/fetchPoemsData').expect(302, done);
  });

  it('should get poemsData', (done) => {
    const db = {};
    db.getPoemsData = () => {
      return new Promise((resolve, rej) => {
        resolve('poemData');
      });
    };

    const sessions = {};
    sessions.createSession = () => '123';
    sessions.getSession = () => '12345';
    app.locals.sessions = sessions;
    app.locals.db = db;
    request(app)
      .get('/api/user/fetchPoemsData')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('/api/user/addPoemData', () => {
  it('should add poemData', (done) => {
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

    const sessions = {};
    sessions.createSession = () => '123';
    sessions.getSession = () => '12345';
    app.locals.sessions = sessions;
    app.locals.db = db;
    request(app)
      .post('/api/user/addPoemData')
      .send({ data: 'poemData' })
      .expect(200, done);
  });
});

describe('/api/user/getUserDetails/:userId', () => {
  it('should get userDetails for given userId', (done) => {
    const db = {};
    db.getPoemsData = () => {
      return new Promise((resolve, rej) => {
        resolve([]);
      });
    };

    db.getUser = (id) => {
      return new Promise((resolve, rej) => {
        if (id) {
          resolve({ user: 'user' });
        }
      });
    };

    const sessions = {};
    sessions.createSession = () => '123';
    sessions.getSession = () => '12345';
    app.locals.sessions = sessions;
    app.locals.db = db;
    request(app)
      .get('/api/user/getUserDetails/1')
      .expect(200, done);
  });
});
