/**
 * FUEL App class
 */

const log = require('../common/log');

class FuelApp {
    /**
     * Construct a new FuelApp
     * @param {String} appPath path on disk where this app is located // TODO might not need this
     * @param {Object} services (required) dictionary containing the manifest for each defined server
     */
    constructor(appPath, services) {
        this._appPath = appPath;
        this._servers = services;
    }

    get path() {
        return this._appPath;
    }

    /**
     * Launch all of the services for the app
     * @return {Boolean}
     */
    launch() {
        // TODO implement
        const server = express(),
            port = 3000;

        // dump the URL+port info to the std output
        log.info('Open http://localhost:' + port + ' to configure the FUEL default engine');
        return server;
    }
}

module.exports = FuelApp;