const { localeService } = require('@base-cms/id-me-service-clients');

module.exports = {
  /**
   *
   */
  LocaleCountry: {
    id: country => country.code,
  },

  /**
   *
   */
  LocaleRegion: {
    id: region => region.code,
    code: region => region.regionCode,
  },

  Query: {
    /**
     *
     */
    localeCountries: (_, { input }) => {
      const { lang, prioritize, withFlag } = input;
      return localeService.request('country.getAll', { lang, prioritize, withFlag });
    },

    /**
     *
     */
    localeRegions: (_, { input }) => {
      const { countryCodes, categories } = input;
      return localeService.request('region.getAll', { countryCodes, categories });
    },
  },
};
