import * as URLS from '../../src/config/urls';

const fetch = require('node-fetch');

describe('Test that all external links are alive', () => {
    beforeEach(() => {
        jest.setTimeout(20000);
    });
    Object.values(URLS).forEach((url) => {
        it(`HTTP GET request to ${url} should respond with 200`, async () => {
            const response = await fetch(url);
            expect(response.status).toEqual(200);
        });
    });
});
