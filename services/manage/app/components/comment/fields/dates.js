import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  classNames: ['form-group'],

  center: moment(),

  start: null,
  end: null,

  range: computed('start', 'end', function() {
    const { start, end } = this;
    return {
      start,
      end,
    };
  }),

  hasSelected: computed.or('start', 'end'),
  noDatesSelected: computed.not('hasSelected'),

  actions: {
    emitChange({ start, end }) {
      this.onChange({
        start,
        end: end ? end.endOf('day') : end,
      });
    },
    clear() {
      this.onChange({ start: null, end: null });
    },
  },
});
