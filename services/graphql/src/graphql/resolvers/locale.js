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
    localeRegionsForCountry: (_, { input }) => {
      const { countryCode, category } = input;
      return localeService.request('region.getAllFor', { countryCode, category });
    },
  },
};
