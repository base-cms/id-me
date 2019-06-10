const { localeService } = require('@base-cms/id-me-service-clients');

module.exports = {
  LocaleCountry: {
    id: country => country.code,
  },

  Query: {
    /**
     *
     */
    localeCountries: (_, { input }) => {
      const { lang, prioritize, withFlag } = input;
      return localeService.request('country.getAll', { lang, prioritize, withFlag });
    },
  },
};
