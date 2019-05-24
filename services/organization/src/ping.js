const mongoose = require('./mongodb/connection');
const pkg = require('../package.json');

const ping = (promise, name) => promise.then(() => `${name} pinged successfully.`);

const mongodb = () => {
  const args = [{ _id: pkg.name }, { $set: { last: new Date() } }, { upsert: true }];
  return Promise.all([
    mongoose.db.command({ ping: 1 }),
    mongoose.db.collection('pings').updateOne(...args),
  ]);
};

module.exports = () => Promise.all([
  ping(mongodb(), 'MongoDB'),
]);
