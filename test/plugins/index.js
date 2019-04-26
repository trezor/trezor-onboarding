// eslint-disable-next-line import/no-extraneous-dependencies
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
    addMatchImageSnapshotPlugin(on, config);
};
