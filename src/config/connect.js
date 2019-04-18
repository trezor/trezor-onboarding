// import { isDevelopment } from 'support/build';

const PRODUCTION_ENDPOINT = 'https://localhost:8088/';
// const PRODUCTION_ENDPOINT = 'https://sisyfos.trezor.io/connect/';

export default {
    init: {
        transportReconnect: true,
        // debug: true,
        popup: false,
        webusb: false,
        manifest: {
            email: 'info@satoshilabs.com',
            appUrl: 'http://localhost:8080',
        },
    },
    endpoint: PRODUCTION_ENDPOINT, // todo: change to proper one
};
