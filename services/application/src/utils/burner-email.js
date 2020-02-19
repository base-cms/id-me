const { emailBurnerList, isEmailBurner } = require('burner-email-providers');

module.exports = {
  emailBurnerList,
  isBurnerEmail: isEmailBurner,
  isBurnerDomain: domain => emailBurnerList.has(domain.toLowerCase()),
};
