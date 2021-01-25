const { isArray } = Array;

module.exports = {
  /**
   *
   */
  FieldInterface: {
    /**
     *
     */
    __resolveType: ({ _type: type }) => {
      const prefix = `${type.charAt(0).toUpperCase()}${type.slice(1)}`;
      return `${prefix}Field`;
    },
  },

  /**
   *
   */
  SelectField: {
    /**
     *
     */
    options: ({ options }) => (isArray(options) ? options : []),
  },
};
