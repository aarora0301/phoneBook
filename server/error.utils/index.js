function throwNoIndexFileError() {
  throw new Error('No index file was given to bootstrapper');
}

function throwNoResourceDirError() {
  throw new Error('No resource dir path was given to bootstrapper');
}

module.exports = {
  throwNoIndexFileError,
  throwNoResourceDirError,
};
