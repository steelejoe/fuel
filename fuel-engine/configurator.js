/*
 *  FUEL config server
 */

const express = require('express');

function loadConfiguration() {
    // load the configuration from persistent storage
}

function launch() {
    const app = express(),
        port = 3000;

    // dump the URL+port info to the std output
    console.log('Open http://localhost:' + port + ' to configure the FUEL default engine');
    return app;
}

exports.loadConfiguration = loadConfiguration;
exports.launch = launch;