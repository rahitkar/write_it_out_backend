class Sessions {
  constructor() {
    this.sessions = {};
    this.id = 0;
  }
  createSession(userId) {
    this.id++;
    this.sessions[this.id] = userId;
    return this.id;
  }

  getSession(sessionId) {
    return this.sessions[sessionId];
  }

  clearSession(sId) {
    delete this.sessions[sId];
  }
}
module.exports = { Sessions };
