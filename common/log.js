/**
 * Log handles structured logging for the engine. 
 * Logging to the console or files done from the engine should be done here. 
 */

let flags = {
    debug: false,
    info: true,
    error: true
};

function enableLogging(logType) {
    flags[logType] = true;
}

function disableLogging(logType) {
    if (logType !== "error") { // can't disable error logging - that would be bad
        flags[logType] = false;
    }
}

function logDebug(...args) {
    if (flags.debug) {
        console.log("Debug: ", ...args);
    }
}

function logError(...args) {
    console.log("Error: ", ...args);
}

function logInfo(...args) {
    if (flags.info) {
        console.log(...args);
    }
}

module.exports.enable = enableLogging;
module.exports.disable = disableLogging;
module.exports.debug = logDebug;
module.exports.error = logError;
module.exports.info = logInfo;