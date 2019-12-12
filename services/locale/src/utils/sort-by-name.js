const normalize = name => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
module.exports = (a, b) => {
  const nameA = normalize(a.name);
  const nameB = normalize(b.name);
  if (nameA > nameB) return 1;
  if (nameA < nameB) return -1;
  return 0;
};
