module.exports = (data, cb) => {
  const keys = Object.keys(data);
  const empty = keys.some((key) => data[key] === "");
  return !empty;
};
