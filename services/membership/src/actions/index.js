const acceptInvite = require('./accept-invite');
const changeRole = require('./change-role');
const create = require('./create');
const deleteMembership = require('./delete');
const deleteInvite = require('./delete-invite');
const hasRole = require('./has-role');
const invite = require('./invite');
const listForOrg = require('./list-for-org');
const listForUser = require('./list-for-user');
const listInvitesForOrg = require('./list-invites-for-org');
const listInvitesForUser = require('./list-invites-for-user');
const viewInvite = require('./view-invite');

module.exports = {
  acceptInvite,
  changeRole,
  create,
  delete: deleteMembership,
  deleteInvite,
  hasRole,
  invite,
  listForOrg,
  listForUser,
  listInvitesForOrg,
  listInvitesForUser,
  viewInvite,
};
