const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const { service } = require('@base-cms/micro');

const { createRequiredParamError } = service;

/**
 * Creates an encoded JWT for the provided payload.
 * If the `jti` and `iat` values are not present in the payload, they will automatically be added.
 *
 * If an `exp` values is provided in the payload, it will override the `ttl` argument.
 *
 * @param {object} params
 * @param {string} params.action The action the token is for.
 * @param {string} params.secret The secret to sign the token with.
 * @param {object} [params.payload={}] The JWT payload object.
 * @param {number} [params.ttl] The token TTL, in seconds
 */
module.exports = async ({
  action,
  secret,
  payload = {},
  ttl,
} = {}) => {
  if (!action) throw createRequiredParamError('action');
  if (!secret) throw createRequiredParamError('secret');
  const now = new Date();
  const iat = Math.floor(now.valueOf() / 1000);

  const exp = ttl ? iat + ttl : undefined;
  const initial = { jti: uuid(), iat };
  if (exp) initial.exp = exp;

  const toSign = {
    ...initial,
    ...payload,
  };
  const token = jwt.sign(toSign, secret);
  return { token, payload: toSign };
};
