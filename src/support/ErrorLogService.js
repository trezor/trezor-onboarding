import * as Sentry from '@sentry/browser';
import * as CONFIG from 'config/sentry.ts';
import { isDevelopment } from 'support/build';

// Not absolutely neccessary here, just using a Proxy to create flat ErrorLogService
// without need to access its service property.
const delegate = (object, delegateProperty) => new Proxy(object, {
    get: (target, property) => {
        // return value if property is in target instance
        if (property in target) return target[property];
        // selectively block forwarding
        // get the property from the delegate
        const value = target[delegateProperty][property];
        if (typeof (value) === 'function') {
        // if it is a function, proxy it so that scope is correct
            return new Proxy(value, {
                apply: (f, thisArg, argumentsList) => {
                    // if trying to call on target, then use delegate
                    // else call on provided thisArg
                    const scope = (thisArg === target
                        ? target[delegateProperty]
                        : thisArg);
                    return f.apply(scope, argumentsList);
                },
            });
        }
        return value;
    },
});

class ErrorLogService {
    constructor(options) {
        this.url = options.url;
        this.service = Sentry;

        return delegate(this, 'service');
    }

    init() {
        if (isDevelopment()) {
            console.log('[ErrorLogService] Skipping error log service init in development');
            return;
        }
        this.service.init({
            dsn: this.url,
        });
    }
}

const errorLogService = new ErrorLogService({ url: CONFIG.URL });

export default errorLogService;