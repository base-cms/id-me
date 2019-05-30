const applicationContext = require('./application');
const orgContext = require('./organization');
const userContext = require('./user');

module.exports = async ({ req }) => {
  const [app, org, user] = await Promise.all([
    applicationContext(req.get('x-app-id')),
    orgContext(req.get('x-organization-id')),
    userContext(req.get('authorization')),
  ]);
  return {
    app,
    org,
    user,
    req,
  };
};
