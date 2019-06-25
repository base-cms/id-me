import Mixin from '@ember/object/mixin';

export default Mixin.create({
  queryParams: {
    phrase: {
      refreshModel: true,
    },
    position: {
      refreshModel: true,
    },
    field: {
      refreshModel: true,
    },
    sortField: {
      refreshModel: true
    },
    sortOrder: {
      refreshModel: true
    },
  },
});
