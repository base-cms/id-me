const { getAsArray, getAsObject } = require('@base-cms/object-path');

/**
 * Pipes results to the passed input stream
 * @param client      - The service client
 * @param action      - The service action
 * @param params      - The service params
 * @param limit       - The number of results that should be returned with each page
 * @param stream      - The input stream to send results to
 */
const executor = async (args) => {
  const {
    client,
    action,
    params,
    limit,
    stream,
  } = args;
  const pagination = getAsObject(params, 'pagination');
  const data = await client.request(action, {
    ...params,
    pagination: {
      ...pagination,
      limit,
    },
  });
  const nodes = getAsArray(data, 'edges').map(({ node }) => node);
  stream.push(JSON.stringify(nodes));
  const { hasNextPage, endCursor } = getAsObject(data, 'pageInfo');
  if (hasNextPage) {
    await executor({
      ...args,
      params: {
        ...params,
        pagination: { ...pagination, after: endCursor },
      },
    });
  }
  stream.push(null);
};

module.exports = async ({
  client,
  action,
  params,
  limit = 500,
  stream,
}) => executor({
  client,
  action,
  params,
  limit,
  stream,
});
