module.exports = (tokenService, { email, ttl = 60 * 60 } = {}) => tokenService.request('create', {
  payload: { aud: email },
  sub: 'user-login-link',
  ttl,
});
