import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: null,

  app: computed('appId', 'applications.[]', function() {
    const appId = this.get('appId');
    const apps = this.get('applications') || [];
    return apps.filter(({ id }) => id === appId).reduce((_, app) => app);
  }),

  appName: computed.reads('app.name'),

});
