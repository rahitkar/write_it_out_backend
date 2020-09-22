const { app } = require('./src/app');

const { Sessions } = require('./src/sessions');
const Database = require('./src/Database');
const { getRedisClient } = require('./src/redisClient');

const redisClient = getRedisClient();
const db = new Database(redisClient);
app.locals.db = db;
app.locals.sessions = new Sessions();

app.listen(8000, () => console.log('listening at port 8000'));
