/*
 *  FUEL Server template
 */

const fuel = require("fuel");

/**
 * Acquire any resources needed for your server
 */
function init() {

}

/**
 * Release any resources you acquired
 */
function shutdown() {

}

/**
 * This api is used to retrieve the APIs used by the servers content.
 * @returns {Object[]} Returns the set of APIs to expose
 */
function methods() {
    return [{
        name: "myApi",
        func: () => {}
    }];
}

exports = {
    init,
    shutdown,
    methods
}