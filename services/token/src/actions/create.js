const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const { service } = require('@base-cms/micro');
const { TOKEN_SECRET } = require('../env');

const { createRequiredParamError } = service;

/**
 * Creates an encoded JWT for the provided payload.
 * If the `jti` and `iat` values are not present in the payload, they will automatically be added.
 *
 * If an `exp` values is provided in the payload, it will override the `ttl` argument.
 *
 * @param {object} params
 * @param {string} params.action The action the token is for.
 * @param {object} [params.payload={}] The JWT payload object.
 * @param {number} [params.ttl] The token TTL, in seconds
 */
module.exports = async ({
  action,
  payload = {},
  ttl,
} = {}) => {
  if (!action) throw createRequiredParamError('action');
  const now = new Date();
  const iat = Math.floor(now.valueOf() / 1000);

  const exp = ttl ? iat + ttl : undefined;
  const initial = { jti: uuid(), iat };
  if (exp) initial.exp = exp;

  const toSign = {
    ...initial,
    ...payload,
  };
  const token = jwt.sign(toSign, TOKEN_SECRET);
  return { token, payload: toSign };
};
