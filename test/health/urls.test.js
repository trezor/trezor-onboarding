import fetch from 'node-fetch';

import * as URLS from '../../src/config/urls';

describe('Test that all external links are alive', () => {
    Object.values(URLS).forEach((url) => {
        it(`HTTP GET request to ${url} should respond with 200`, async () => {
            const response = await fetch(url);
            expect(response.status).toEqual(200);
        });
    });
});
