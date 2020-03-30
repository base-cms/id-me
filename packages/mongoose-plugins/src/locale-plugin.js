const { stripLines } = require('@identity-x/utils');
const { isPostalCode } = require('validator');

module.exports = function localePlugin(schema, { localeService } = {}) {
  schema.add({
    regionCode: {
      type: String,
      trim: true,
      uppercase: true,
      set: stripLines,
      validate: {
        async validator(regionCode) {
          if (!regionCode) return true;
          const { countryCode } = this;
          if (!countryCode) return false;
          return localeService.request('region.isValid', { countryCode, regionCode });
        },
        message: 'Either an invalid region code {VALUE} was set, or no country was defined.',
      },
    },
    regionName: {
      type: String,
      trim: true,
    },
    countryCode: {
      type: String,
      trim: true,
      uppercase: true,
      set: stripLines,
      validate: {
        async validator(code) {
          if (!code) return true;
          return localeService.request('country.isValid', { code });
        },
        message: 'Invalid country code {VALUE}',
      },
    },
    countryName: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
      uppercase: true,
      set: stripLines,
      validate: {
        async validator(postalCode) {
          if (!postalCode) return true;
          const { countryCode } = this;
          if (!countryCode) return true;
          if (!['US', 'CA', 'MX'].includes(countryCode)) return true;
          return isPostalCode(postalCode, countryCode);
        },
        message: 'Invalid postal code {VALUE} for the provided country.',
      },
    },
  });

  schema.pre('validate', async function convertCountryCode() {
    const { countryCode } = this;
    if (!countryCode) {
      this.countryCode = undefined;
      this.regionCode = undefined;
      return;
    }
    const obj = await localeService.request('country.asObject', { code: countryCode });
    if (!obj) {
      this.countryCode = countryCode;
      return;
    }
    this.countryCode = obj.code;
  });

  schema.pre('save', async function setCountryName() {
    const { countryCode } = this;
    this.countryName = countryCode ? await localeService.request('country.getName', { code: countryCode }) : undefined;
  });

  schema.pre('save', async function setRegionName() {
    const { countryCode, regionCode } = this;
    if (countryCode && regionCode) {
      const name = await localeService.request('region.getName', { countryCode, regionCode });
      this.regionName = name || undefined;
    } else {
      this.regionName = undefined;
    }
  });
};
