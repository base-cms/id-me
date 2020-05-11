import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    return {
      countryCodes: [],
      enabled: true,
    };
  },
});
