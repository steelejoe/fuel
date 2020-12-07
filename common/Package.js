/**
 * FUEL Package class
 */

class Package {
    constructor() {
        this.manifest = {};
        this.servers = [];
        this.apps = [];
        this.signature = {};
    }

    addManifest = (entry) => {
        entry.pipe(fs.createReadStream(entry.path))
            .on("entry", (entry) => {
                // parse contents based on entry type and add to package
                const fileName = entry.path,
                    type = entry.type,
                    size = entry.size;
                // entry.pipe(fs.createReadStream(fileName)); // handle this file
                entry.autodrain(); // if not handled, then discard
            });
    };

    addServer = () => {};
    addApp = () => {};
    addSignature = () => {};

    isSigned = () => {
        return false;
    };

    isSignatureValid = () => {
        return false;
    };
}

exports.Package = Package;