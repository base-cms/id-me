import Component from '@ember/component';
import SendEventMixin from '@identity-x/manage/mixins/send-event';

export default Component.extend(SendEventMixin, {
  option: null,
  disabled: false,

  actions: {
    remove() {
      this.sendEvent('remove', this.option);
    },
  },
});
