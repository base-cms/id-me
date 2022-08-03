const fetch = require('node-fetch');
const { GOOGLE_RECAPTCHA_API_SECRET } = require('../env');

module.exports = {
  validate: async (token) => {
    // if no key is setup just return true
    if (!GOOGLE_RECAPTCHA_API_SECRET) return true;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${GOOGLE_RECAPTCHA_API_SECRET}&response=${token}`;
    const response = await fetch(url, { method: 'post' });
    const data = await response.json();
    if (data.success && data.score >= 0.5) {
      return true;
    }
    return false;
  },
};
