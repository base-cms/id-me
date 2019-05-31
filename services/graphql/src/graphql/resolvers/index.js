const deepAssign = require('deep-assign');

const accessLevel = require('./access-level');
const application = require('./application');
const organization = require('./organization');
const team = require('./team');
const user = require('./user');
const { DateType, ObjectIDType } = require('../types');

module.exports = deepAssign(
  accessLevel,
  application,
  organization,
  team,
  user,
  {
    /**
     * Custom scalar types.
     */
    Date: DateType,
    ObjectID: ObjectIDType,

    /**
     * Root queries.
     */
    Query: {
      /**
       *
       */
      ping: () => 'pong',
    },

    /**
     * Root mutations.
     */
    Mutation: {
      /**
       *
       */
      ping: () => 'pong',
    },
  },
);
