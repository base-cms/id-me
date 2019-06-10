module.exports = (code) => {
  const OFFSET = 127397;
  const chars = [...code].map(c => c.charCodeAt() + OFFSET);
  return String.fromCodePoint(...chars);
};
