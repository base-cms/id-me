const app = require('./app');
const env = require('./env');

const { log } = console;
const { INTERNAL_PORT, EXTERNAL_PORT } = env;

app.get('/', (req, res) => {
  res.json({ ping: 'pong' });
});

app.listen(INTERNAL_PORT, () => log(`Listening on http://0.0.0.0:${EXTERNAL_PORT}`));
