const { createError } = require('micro');
const { createRequiredParamError } = require('@base-cms/micro').service;
const AppUser = require('../../mongodb/models/app-user');
const set = require('./utils/set-regional-consent-answer');

module.exports = {
  setOne: async ({ id, policyId, given }) => {
    if (!id) throw createRequiredParamError('id');
    const user = await AppUser.findById(id);
    if (!user) throw createError(404, `No user was found for '${id}'`);

    set({ user, policyId, given });
    return user.save();
  },

  setMany: async ({ id, answers = [] }) => {
    if (!id) throw createRequiredParamError('id');
    const user = await AppUser.findById(id);
    if (!user) throw createError(404, `No user was found for '${id}'`);

    answers.forEach(({ policyId, given }) => {
      set({ user, policyId, given });
    });
    return user.save();
  },
};
