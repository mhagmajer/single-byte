// eslint-disable-next-line import/no-extraneous-dependencies
const flowRemoveTypes = require('flow-remove-types');

module.exports = {
  process: src => flowRemoveTypes(src).toString(),
};
