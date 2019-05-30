const tokenService = require('@base-cms/id-me-token-client');

module.exports = (email, ttl = 60 * 60) => tokenService.request('create', {
  payload: { aud: email },
  sub: 'user-login-link',
  ttl,
});
