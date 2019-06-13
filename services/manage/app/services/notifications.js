import Service, { inject } from '@ember/service';

export default Service.extend({
  flashMessages: inject(),

  info(message, options) {
    return this.flashMessages.info(message, options);
  },

  success(message, options) {
    return this.flashMessages.success(message, options);
  },

  warning(message, options) {
    return this.flashMessages.warning(message, options);
  },

  error(message, options) {
    return this.flashMessages.danger(message, {
      sticky: true,
      showProgress: false,
      ...options,
    });
  },
});
