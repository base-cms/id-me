const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const { createRequiredParamError } = require('@base-cms/micro').service;
const { TOKEN_SECRET } = require('../env');
const Token = require('../mongodb/models/token');

/**
 * Creates an encoded JWT for the provided payload.
 *
 * The `sub` param is required and cannot be overridden by the payload object.
 * The `jti` value is auto-generated, and cannot be overriden by the payload object.
 *
 * If the `iat` value is not present in the payload, it will automatically be added.
 * If an `exp` values is provided in the payload, it will override the `ttl` argument.
 *
 * @param {object} params
 * @param {object} [params.payload={}] The JWT payload object.
 * @param {number} [params.ttl] The token TTL, in seconds
 */
module.exports = async ({
  payload = {},
  ttl,
  sub,
} = {}) => {
  if (!sub) throw createRequiredParamError('sub');
  const now = new Date();
  const iat = Math.floor(now.valueOf() / 1000);

  const jti = uuid();
  const exp = ttl ? iat + ttl : undefined;
  const initial = { jti, iat, sub };
  if (exp) initial.exp = exp;

  const toSign = {
    ...payload,
    ...initial,
  };
  const token = jwt.sign(toSign, TOKEN_SECRET);
  await Token.create({ _id: jti, sub, payload: toSign });
  return { token, payload: toSign };
};
