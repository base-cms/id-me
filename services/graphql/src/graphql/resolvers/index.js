const deepAssign = require('deep-assign');
const { DateType } = require('../types');

module.exports = deepAssign(
  {
    /**
     * Custom scalar types.
     */
    Date: DateType,

    /**
     * Root queries.
     */
    Query: {
      /**
       *
       */
      ping: () => 'pong',
    },
  },
);
