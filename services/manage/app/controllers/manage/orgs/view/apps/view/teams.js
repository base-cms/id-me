import ListController from '@identity-x/manage/controllers/abstract-list';

export default ListController.extend({
  init() {
    this._super(...arguments);
    this.set('sortOptions', [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'createdAt', label: 'Created' },
      { key: 'updatedAt', label: 'Updated' },
    ]);
    this.set('sortField', 'name');
    this.set('sortOrder', 'asc');

    this.set('searchFields', [
      { key: 'name', label: 'Name' },
    ]);
    this.set('field', 'name');
  },
});
