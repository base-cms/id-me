const deepAssign = require('deep-assign');
const { DateType, ObjectIDType } = require('../types');
const organization = require('./organization');
const user = require('./user');

module.exports = deepAssign(
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
