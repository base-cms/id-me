const { applicationService } = require('@identity-x/service-clients');

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
    id: field => field._id,

    /**
     *
     */
    options: ({ options }) => (isArray(options) ? options : []),
  },

  /**
   *
   */
  SelectFieldOption: {
    /**
     *
     */
    id: option => option._id,
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createSelectField: (_, { input }, { app }) => {
      const {
        name,
        label,
        multiple,
        options,
      } = input;
      const applicationId = app.getId();
      return applicationService.request('field.create', {
        type: 'select',
        applicationId,
        payload: {
          name,
          label,
          multiple,
          options,
        },
      });
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    fields: (_, { input }, { app }) => {
      const id = app.getId();
      const { sort, pagination } = input;
      return applicationService.request('field.listForApp', {
        id,
        sort,
        pagination,
      });
    },

    /**
     *
     */
    matchFields: (_, { input }, { app }) => {
      const applicationId = app.getId();

      const {
        field,
        phrase,
        position,
        pagination,
        sort,
        excludeIds,
      } = input;

      return applicationService.request('field.matchForApp', {
        applicationId,
        field,
        phrase,
        position,
        pagination,
        sort,
        excludeIds,
      });
    },
  },
};
