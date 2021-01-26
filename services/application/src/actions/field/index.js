const {
  findById,
  listForApp,
  matchForApp,
} = require('@identity-x/utils').actions;
const { createParamError } = require('@base-cms/micro').service;
const create = require('./create');
const updateOne = require('./update-one');
const userSelectAnswers = require('./user-select-answers');

const Field = require('../../mongodb/models/field');
const SelectField = require('../../mongodb/models/field/select');

module.exports = {
  create,
  findById: ({ id, type, fields }) => {
    const supportedTypes = ['select'];
    if (!supportedTypes.includes(type)) throw createParamError('type', type, supportedTypes);
    return findById(SelectField, { id, fields });
  },
  listForApp: params => listForApp(Field, params),
  matchForApp: params => matchForApp(Field, params),
  updateOne,
  userSelectAnswers,
};
