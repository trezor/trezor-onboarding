export default {
    init: {
        transportReconnect: true,
        debug: true,
        popup: false,
        webusb: false,
        manifest: {
            email: 'info@satoshilabs.com',
            appUrl: 'http://localhost:8080',
        },
    },
    // eslint-disable-next-line no-undef
    endpoint: CONNECT || null,
};
