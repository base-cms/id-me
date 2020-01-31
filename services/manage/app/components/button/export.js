import Component from '@ember/component';

export default Component.extend({
  tagName: 'button',
  classNames: 'btn btn-xl btn-info btn-circle btn-create',
  icon: 'download',
  title: 'Export',
  action: null,

  async click() {
    this.action();
  },
});
