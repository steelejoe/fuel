/*
 *  FUEL config server
 */

const express = require('express');

function loadConfiguration() {
    // load the configuration from persistent storage
    return {
        installed: { foobar: '/path/to/package' },
        debugging: true
    }
}

function launch(config, onExit) {
    const app = express(),
        port = 3000;

    // TODO launch the actual server

    // dump the URL+port info to the std output
    console.log('Open http://localhost:' + port + ' to configure the FUEL default engine');
    return app;
}

exports.loadConfiguration = loadConfiguration;
exports.launch = launch;