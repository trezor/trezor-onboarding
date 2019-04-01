import { isDevelopment } from 'support/build';

const LOCAL_ENDPOINT = 'http://localhost:8088/';
const PRODUCTION_ENDPOINT = 'https://sisyfos.trezor.io/blyat/';

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
    endpoint: isDevelopment() ? LOCAL_ENDPOINT : PRODUCTION_ENDPOINT, // todo: change to proper one
};
