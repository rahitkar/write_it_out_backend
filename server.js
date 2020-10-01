const { app } = require('./app');

const { Sessions } = require('./src/sessions');
const Database = require('./src/Database');
const { getRedisClient } = require('./src/redisClient');

const redisClient = getRedisClient();
const db = new Database(redisClient);
app.locals.db = db;
app.locals.sessions = new Sessions();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log('listening at port 8000'));
