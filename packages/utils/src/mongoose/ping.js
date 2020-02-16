const mongodb = (connection, pkg) => {
  const args = [{ _id: pkg.name }, { $set: { last: new Date() } }, { upsert: true }];
  return Promise.all([
    connection.db.command({ ping: 1 }),
    connection.db.collection('pings').updateOne(...args),
  ]);
};

module.exports = ({ connection, pkg } = {}) => () => mongodb(connection, pkg).then(() => 'MongoDB pinged successfully.');
