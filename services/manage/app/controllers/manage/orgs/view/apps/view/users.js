import ListController from '@base-cms/id-me-manage/controllers/abstract-list';

export default ListController.extend({
  init() {
    this._super(...arguments);
    this.set('sortOptions', [
      { key: 'id', label: 'ID' },
      { key: 'createdAt', label: 'Created' },
      { key: 'updatedAt', label: 'Updated' },
      { key: 'email', label: 'Email Address' },
    ]);
    this.set('sortField', 'updatedAt');
    this.set('sortOrder', 'desc');

    this.set('searchFields', [
      { key: 'email', label: 'Email Address' },
      { key: 'givenName', label: 'First Name' },
      { key: 'familyName', label: 'Last Name' },
    ]);
    this.set('field', 'email');
  },
});
