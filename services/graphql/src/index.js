const app = require('./app');

const { log } = console;
const { PORT = 3759 } = process.env;

app.get('/', (req, res) => {
  res.json({ ping: 'pong' });
});

app.listen(PORT, () => log(`Listening on http://0.0.0.0:${PORT}`));
