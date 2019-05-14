// eslint-disable-next-line import/no-extraneous-dependencies
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
    addMatchImageSnapshotPlugin(on, config);

    on('before:browser:launch', (browser = {}, args) => {
        // browser will look something like this
        // {
        //   name: 'chrome',
        //   displayName: 'Chrome',
        //   version: '63.0.3239.108',
        //   path: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        //   majorVersion: '63'
        // }

        if (browser.name === 'chrome') {
            args.push('--disable-site-isolation-trials');

            // whatever you return here becomes the new args
            return args;
        }
    });
};
