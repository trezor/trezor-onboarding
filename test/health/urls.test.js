import * as URLS from '../../src/config/urls';

const fetch = require('node-fetch');

describe('Test that all external links are alive', () => {
    beforeEach(() => {
        jest.setTimeout(20000);
    });
    // const resp = await fetch('https://github.com/');
    Object.values(URLS).forEach((url) => {
        it(`HTTP GET request to ${url} should respond with 200`, async () => {
            console.warn(url);
            const response = await fetch(url);
            console.warn(response.status);
            expect(response.status).toEqual(200);
        });
    });
});
