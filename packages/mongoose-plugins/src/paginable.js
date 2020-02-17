const { find, utils } = require('@identity-x/pagination');

const { createEmptyResponse } = utils;

module.exports = function paginablePlugin(schema, {
  collateWhen = [],
} = {}) {
  schema.static('paginate', function paginate({
    query,
    limit,
    after,
    sort,
    projection,
    excludeProjection,
  }) {
    return find(this, {
      query,
      limit,
      after,
      sort,
      collate: collateWhen.includes(sort.field),
      projection,
      excludeProjection,
    });
  });

  schema.static('paginateEmpty', () => createEmptyResponse());
};
