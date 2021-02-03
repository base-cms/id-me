const { getAsArray, getAsObject } = require('@base-cms/object-path');

const { isArray } = Array;

/**
 * Pipes results to the passed input stream
 * @param {object} args The function args
 * @param {object} args.client The service client
 * @param {string} args.action The service action
 * @param {string} args.params The service params
 * @param {number} limit The number of results to process in each chunk
 * @param {object} stream The json2csv AsyncProcessor input stream
 */
const executor = async (args) => {
  const {
    client,
    action,
    params,
    limit = 500,
    fields,
    regionalConsentPolicies,
    customSelectFields,
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
  const nodes = getAsArray(data, 'edges').map((edge) => {
    const { node } = edge;

    const row = fields.reduce((o, field) => ({ ...o, [field]: node[field] == null ? '' : node[field] }), {});

    const consentAnswers = getAsArray(node, 'regionalConsentAnswers');
    const answers = regionalConsentPolicies.reduce((o, policy) => {
      const answer = consentAnswers.find(v => v._id === policy._id);
      const given = answer ? answer.given : false;
      return { ...o, [`Consent: ${policy.name}`]: given };
    }, {});

    const customSelectAnswers = customSelectFields.reduce((o, customSelect) => {
      let rowLabel = `Custom: ${customSelect.name}`;
      if (!customSelect.active) rowLabel = `${rowLabel} [inactive]`;
      const userAnswers = getAsArray(node, 'customSelectFieldAnswers');
      const fieldAnswer = userAnswers.find(answer => `${answer._id}` === `${customSelect._id}`);
      const answeredOptions = fieldAnswer && isArray(fieldAnswer.values)
        ? fieldAnswer.values
          .map(value => customSelect.options.find(option => `${option._id}` === `${value}`).label)
          .filter(option => option)
        : [];
      return { ...o, [rowLabel]: customSelect.multiple ? answeredOptions.join('|') : (answeredOptions[0] || '') };
    }, {});

    return { ...row, ...customSelectAnswers, ...answers };
  });
  stream.push(JSON.stringify(nodes));
  const { hasNextPage, endCursor } = getAsObject(data, 'pageInfo');
  if (hasNextPage) {
    await executor({
      ...args,
      params: {
        ...params,
        pagination: { ...pagination, limit, after: endCursor },
      },
    });
  }
  stream.push(null);
};

module.exports = executor;
