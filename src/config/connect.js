// import { isDevelopment } from 'support/build';

const DEVEL_ENDPOINT = 'http://localhost:8088/';
// const DEVEL_ENDPOINT = 'https://sisyfos.trezor.io/blyat/';

export default {
    init: {
        transportReconnect: true,
        debug: false,
        popup: false,
        webusb: false,
        manifest: {
            email: 'info@satoshilabs.com',
            appUrl: 'http://localhost:8080',
        },
    },
    endpoint: DEVEL_ENDPOINT, // todo: change to proper one
};
