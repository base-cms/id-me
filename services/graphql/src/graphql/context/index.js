const orgContext = require('./organization');
const userContext = require('./user');

module.exports = async ({ req }) => {
  const [org, user] = await Promise.all([
    orgContext(req.get('x-organization-id')),
    userContext(req.get('authorization')),
  ]);
  return { org, user, req };
};
