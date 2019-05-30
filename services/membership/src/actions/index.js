const acceptInvite = require('./accept-invite');
const changeRole = require('./change-role');
const create = require('./create');
const deleteMembership = require('./delete');
const deleteInvite = require('./delete-invite');
const invite = require('./invite');

module.exports = {
  acceptInvite,
  changeRole,
  create,
  delete: deleteMembership,
  deleteInvite,
  invite,
};
