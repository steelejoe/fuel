/*
 *  FUEL default engine
 */

const ArgParser = require('argparse'),
    config = require('config'),
    packageLoader = require('../common/packageLoader'),
    { version } = require('./package.json');

const parser = new ArgParser({
    description: 'fuel - default FUEL package runner'
});

parser.add_argument('-v', '--version', {
    action: 'version',
    version
});
parser.add_argument('-i', '--install', {
    type: 'str',
    help: 'fuel --install path/to/package.fuel',
    description: 'Install FUEL package'
});
parser.add_argument('-l', '--launch', {
    type: 'str',
    help: 'fuel --launch [path/to/package.fuel|installed-package-name]',
    description: 'Launch FUEL package'
});
const args = parser.parse_args();

let config = configurator.loadConfiguration(),
    server;

if (args.install) {
    // unzip package into persistent location and register with engine
} else
if (args.launch) {
    // check if package file name is registered // TODO more here
    // if registered, launch from registered location
    // if not, unzip to temporary location and launch
} else {
    server = configurator.launch();
}