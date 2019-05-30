const deepAssign = require('deep-assign');

const application = require('./application');
const organization = require('./organization');
const user = require('./user');
const { DateType, ObjectIDType } = require('../types');

module.exports = deepAssign(
  application,
  organization,
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
