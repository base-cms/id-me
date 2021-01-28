import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      options: [],
      multiple: false,
      active: false,
      required: false,
    };
  },
});
