
const ENDPOINT = 'http://localhost:8088/';
// const ENDPOINT = 'https://sisyfos.trezor.io/connect/';

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
    development: ENDPOINT,
};
