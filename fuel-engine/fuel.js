#!/usr/bin/env node

/**
 * FUEL default engine
 */

const { ArgumentParser } = require('argparse'),
    configurator = require('./configurator'),
    FuelPackage = require('./fuelPackage'), { version } = require('./package.json');

const parser = new ArgumentParser({
    description: 'fuel - default FUEL package runner'
});

parser.add_argument('-v', '--version', {
    action: 'version',
    help: 'Show version of the FUEL engine',
    version
});
parser.add_argument('-i', '--install', {
    action: 'store_true',
    help: 'Install the FUEL package'
});
parser.add_argument('-r', '--run', {
    action: 'store_true',
    help: 'Run the FUEL package'
});
parser.add_argument('-f', '--find', {
    action: 'store_true',
    help: 'Find installed package using name'
});
parser.add_argument('-c', '--config', {
    action: 'store_true',
    help: 'Run the FUEL engine configurator. Overrides other params'
});
parser.add_argument('path', {
    type: 'str',
    help: '/path/to/fuel/package'
});
const args = parser.parse_args();

if (args.config && (args.path || args.install || args.run || args.find)) {
    console.log('Info: --config is a standalone option. All other params ignored');
} else if (args.path && !args.find && (!args.install && !args.run)) {
    console.error('Error: --install, --run or --find must be specified');
    process.exit(-1);
} else if (args.find && !args.path) {
    console.error('Error: Package name must be specified with --find');
    process.exit(-1);
} else if (args.find && args.install) {
    console.error('Error: --install must not be specified with --find');
    process.exit(-1);
}

let config = configurator.loadConfiguration(),
    server, package, path;

if (args.config) {
    // TODO how do we exit?
    server = configurator.launch(config, (err) => {
        if (err) {
            console.error(`Error: server failed to launch with error ${err}`);
        }
        process.exit(err ? -1 : 0);
    });
} else {
    path = args.find ? config.installed[args.path] : args.path;
    console.log(`Package: ${path}`);
    if (args.install || args.run) {
        package = new FuelPackage(path, args.install, configuration.cacheDir);
        package.open()
            .then(() => {
                if (args.run) {
                    server = package.launch(); // TODO do we want to pass any config?
                }
            })
    }
}