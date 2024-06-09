/**
 * FuelPackage handles package level operations
 * This class will:
 *  - zip/unzip package
 *  - decrypt package files (*one day)
 *  - validate package layout before zipping and after unzipping
 *  - construct FuelApp as it unzips
 */

const fs = require('fs'),
    FuelApp = require('../common/fuelApp'),
    log = require('../common/log'),
    unzipper = require('unzipper');

class FuelPackage {

    constructor() {
        this._manifest = {
            name: 'Anonymous',
            description: '',
            version: '1.0',
            services: []
        };
        this._app = null;
        this._services = [];
        this._signature = undefined;
    }

    set name(name) {
        this._manifest.name = name;
    }

    get name() {
        return this._manifest.name;
    }

    set description(description) {
        this._manifest.description = description;
    }

    get description() {
        return this._manifest.description;
    }

    set version(version) {
        this._manifest.version = version;
    }

    get version() {
        return this._manifest.version;
    }

    /**
     * This will validate the package and create an app from the contents.
     * @param {String} appPath path to load un-packaged app from
     */
    set app(appPath) {
        if (!appPath) {
            log.error('Invalid FUEL app');
        }
        try {
            if (!fs.existsSync(appPath)) {
                log.error(`App at "${appPath}" does not exist or is not accessible`);
                return;
            }
        } catch (err) {
            log.error(`${err} occurred checking for access to "${appPath}"`);
            return;
        }
        this._appPath = appPath;

        // TODO validate the un-packaged app
        // -- is the validation async?
        // this._app needs to be a Promise that resolves to a new FuelApp - not a FuelApp
        this._app = new FuelApp(this._appPath);
    }

    /**
     * @return {Promise{FuelApp}}
     */
    async get app() {
        return this._app;
    }

    setService(serviceName, manifest) {
        if (manifest) {
            this._manifest.services.push(serviceName);
            this._services[serviceName] = manifest;
        } else {
            this._manifest.services = this._manifest.services.filter(n => n !== serviceName);
            delete this._services[serviceName];
        }
    }

    getService(serviceName) {
        return this._services[serviceName];
    }

    async _writePackageManifest() {
        return Promise.resolve(); // TODO implement
    }

    async _writeServiceManifest() {
        return Promise.resolve(); // TODO implement
    }

    /**
     * This will validate the package signature according to fuel-package-signature.md.
     * @return {Promise{Boolean}}
     */
    async _isSignatureValid() {
        return Promise.resolve(true); // TODO implement
    }

    /**
     * This will validate the package complies with fuel-package-layout.md.
     * @return {Promise{Boolean}}
     */
    async _isLayoutValid() {
        return Promise.resolve(true); // TODO implement
    }

    /**
     * This will sign the package signature according to fuel-package-signature.md using the specified credentials
     * @param {String} credentials // TODO figure out what this actually is
     * @return {Promise{Boolean}}
     */
    async _sign(credentials) {
        return Promise.resolve(true); // TODO implement
    }

    /**
     * Handle a single item in the zip file.
     * @param {Object} entry Zip file descriptor
     * @return {Promise}
     */
    async _handleEntry(entry) {
        /**
        entry.pipe(fs.createReadStream(entry.path))
            .on("entry", (entry) => {
                // parse contents based on entry type and add to package
                const fileName = entry.path,
                    type = entry.type,
                    size = entry.size;
                // entry.pipe(fs.createReadStream(fileName)); // handle this file
                entry.autodrain(); // if not handled, then discard
            });
         * 
         */
        let promise = Promise();
        // Useful entry members: entry.path, entry.uncompressedSize, await entry.buffer, entry.stream
        const localPath = this._appPath + '/' + entry.path;
        log.debug(`_handleEntry: entry.path=${entry.path} localPath=${localPath}`);
        fs.writeFile(localPath, buffer, (err) => {
            if (err) {
                log.error(`${err} occurred writing file to ${localPath}`);
                promise.reject();
            } else {
                promise.resolve();
            }
        });
        return promise;
    }

    /**
     * This will unzip the package and return the app inside.
     * @param {String} packagePath (required) path to package
     * @param {String} appPath (required) package is unzipped here
     * @return {Promise{FuelApp}}
     */
    async open(packagePath, appPath) {

        // sanity check the paths
        try {
            if (!packagePath.endsWith('.fuel')) {
                log.error(`${packagePath} is not a FUEL package`);
                return Promise.reject();
            }
            if (!fs.existsSync(packagePath)) {
                log.error(`Package at ${packagePath} does not exist or is not accessible`);
                return Promise.reject();
            }
        } catch (err) {
            log.error(`${err} occurred checking for access to ${packagePath}`);
            return Promise.reject();
        }
        try {
            if (!fs.existsSync(appPath)) {
                log.error(`Output folder at ${appPath} does not exist or is not accessible`);
                return Promise.reject();
            }
            // TODO check if appPath already has content under it
        } catch (err) {
            log.error(`${err} occurred checking for access to ${appPath}`);
            return Promise.reject();
        }

        // set the paths
        this._packagePath = packagePath;
        this._appPath = appPath;

        // unzip the package
        return unzipper.Open.file(this._packagePath)
            .then((directory) => {
                let promises = [];
                directory.files.forEach((entry) => {
                    promises.push(this._handleEntry(entry));
                });
                return Promise.all(promises);
            })
            .then(() => {
                // return the app inside
                log.debug(`App was opened at ${this._appPath}`);
                // appPath, services
                this.app = this._appPath;
                return this.app();
            });
    }

    /**
     * This will validate the layout, sign the package contents, build package, and return the output path.
     * If any of the above steps fail, the promise is rejected.
     * @param {String} packagePath (required) The path to put the final package under
     * @param {String} credentials (optional) // TODO figure out what this actually is
     * @return {Promise{String}}
     */
    async build(packagePath, credentials) {

        // sanity check
        if (!packagePath) {
            log.error('Invalid build parameters');
            return Promise.reject();
        }
        try {
            if (!fs.existsSync(packagePath)) {
                log.error(`Output folder ${packagePath} does not exist or is not accessible`);
                return Promise.reject();
            }
        } catch (err) {
            log.error(`${err} occurred checking for access to ${packagePath}`);
            return Promise.reject();
        }

        this._appPath = tmpDir.name + '/' + this.name;
        // TODO write the package manifest at this._appPath + 'manifest.json'
        // TODO for each service
        //  -- create folder at this._appPath + '\' + service.name
        //  -- write the service manifest to this folder
        //  -- copy all the service contents to this folder

        // set the paths
        this._packagePath = packagePath;

        // TODO implement
        return Promise.reject();
    }
}

module.exports = FuelPackage;