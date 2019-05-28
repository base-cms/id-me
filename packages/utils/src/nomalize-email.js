module.exports = (email) => {
  if (!email) return '';
  return String(email).trim().toLowerCase();
};
