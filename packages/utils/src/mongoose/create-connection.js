module.exports = ({
  mongoose,
  pkg = {},
  dsn,
  options = {},
} = {}) => {
  const { name, version } = pkg;
  return mongoose.createConnection(dsn, {
    ...options,
    // autoIndex: env.NODE_ENV !== 'production',
    appname: `${name} v${version}`,
    bufferMaxEntries: 0, // Default -1
    ignoreUndefined: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};
