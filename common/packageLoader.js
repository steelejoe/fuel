/**
 * FUEL package loader
 */

const unzip = require('unzip');

/**
 * @param {String} path Path to a package component
 * @return {Boolean}
 */
function isPackageManifest() {
    return false;
}

/**
 * @param {String} path Path to a package component
 * @return {Boolean}
 */
function isSignature() {
    return false;
}

/**
 * @param {String} path Path to a package component
 * @return {Boolean}
 */
function isServer() {
    return false;
}

/**
 * @param {String} path Path to a package component
 * @return {Boolean}
 */
function isApplication() {
    return false;
}

function parse(path) {
    let package = {}; // this should be a new Package object
    fs.createReadStream(path)
        .pipe(unzip.Parse())
        .on("entry", (entry) => {
            // parse contents based on entry type and add to package
            const fileName = entry.path,
                type = entry.type,
                size = entry.size;
            // entry.pipe(fs.createReadStream(fileName)); // handle this file
            entry.autodrain(); // if not handled, then discard
        });

    return package;
}