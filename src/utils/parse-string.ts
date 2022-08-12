export default (string) => {
  const stringPick = string.match(/^(\d+)\[(.+)\]$/);

  if (typeof stringPick != 'object') return;
  if (!stringPick || stringPick[1] !== '42') return;

  const payload = stringPick[2].slice(7, stringPick[2].length);

  return JSON.parse(payload);
};
