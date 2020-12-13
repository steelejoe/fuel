/**
 * Package is a class for handing package unzipping, validation and access.
 */

const express = require('express'),
    fs = require('fs'),
    tmp = require('tmp'),
    unzipper = require('unzipper');

class FuelPackage {

    /**
     * @param {String} path path to zipped file
     * @param {Boolean} persistent true if cached package should be retained
     * @param {String} cacheDir MUST be defined if persistent === true
     */
    constructor(path, persistent, cacheDir) {
        this._path = path;
        if (persistent) {
            // TODO verify that cacheDir exists
            this._cacheDir = cacheDir;
        } else {
            this._cacheDir = tmp.dirSync({ unsafeCleanup: true });
            tmp.setGracefulCleanup();
        }
    }

    /**
     * Check if package has already been unzipped in cache directory
     * @return {Boolean}
     */
    cached = () => {
        // TODO what additional verification should I do?
        // -- compare against package directory?
        // -- validate the signature?
        return false;
    }

    /**
     * Check if package has already been unzipped in cache directory
     * @return {Boolean}
     */
    launch = () => {
        const app = express(),
            port = 3000;

        // dump the URL+port info to the std output
        console.log('Open http://localhost:' + port + ' to configure the FUEL default engine');
        return app;
    }

    /**
     * @param {Object} entry Zip file descriptor
     * @return {Promise}
     */
    handleEntry = async(entry) => {
        let promise = Promise();
        /*
        Useful entry members:
            entry.path
            entry.uncompressedSize
            await entry.buffer
            entry.stream?

            localPath = cacheDir + '/' + entry.path;
            fs.writeFile(localPath, buffer, (err) => {
                // file was written or error occurred
                promise.resolve();
            });
        */
        return promise;
    }

    open = async() => {
        // TODO check whether cached
        return unzipper.Open.file(this._path)
            .then((directory) => {
                let promises = [];
                directory.files.forEach((entry) => {
                    promises.push(handleEntry(entry));
                });
                return Promise.all(promises);
            });
    }
}

module.exports = FuelPackage;