const { Sort } = require('@identity-x/pagination');
const SelectField = require('../../mongodb/models/field/select');

const { isArray } = Array;

module.exports = async ({
  applicationId,
  fieldIds,
  customSelectFieldAnswers,
  onlyAnswered,
  onlyActive,
  sort,
} = {}) => {
  const $sort = new Sort(sort);
  const fieldQuery = {
    applicationId,
    ...(isArray(fieldIds) && fieldIds.length && { _id: { $in: fieldIds } }),
    ...(onlyActive && { active: { $ne: false } }),
  };
  const fields = await SelectField.find(fieldQuery, {}, { sort: $sort.value });

  // return nothing when no custom selects are found.
  if (!fields.length) return [];

  // ensure answers are an array
  const customFieldAnswers = !isArray(customSelectFieldAnswers) || !customSelectFieldAnswers.length
    ? []
    : customSelectFieldAnswers;

  // return nothing when no answers are found and only answered questions have been requested.
  if (onlyAnswered && !customFieldAnswers.length) return [];

  const mapped = fields.map((field) => {
    const { multiple } = field;
    const fieldAnswer = customFieldAnswers.find(answer => `${answer._id}` === `${field._id}`);
    const answeredOptions = fieldAnswer && isArray(fieldAnswer.values)
      ? fieldAnswer.values
        .map(value => field.options.find(option => `${option._id}` === `${value}`))
        .filter(option => option)
      : [];

    return {
      id: field._id,
      field,
      hasAnswered: Boolean(answeredOptions.length),
      answers: multiple ? answeredOptions : [answeredOptions[0]].filter(v => v),
    };
  });
  return onlyAnswered ? mapped.filter(field => field.hasAnswered) : mapped;
};
