#!/usr/bin/env node

/**
 * FUEL default engine
 */

const { ArgumentParser } = require('argparse'), { version } = require('./package.json'),
    configurator = require('./configurator'),
    FuelApp = require('../common/fuelApp'),
    FuelPackage = require('../common/fuelPackage'),
    log = require('../common/log'),
    tmp = require('tmp');

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
    log.info('--config is a standalone option. All other params ignored');
} else if (args.path && !args.find && (!args.install && !args.run)) {
    log.error('--install, --run or --find must be specified');
    process.exit(-1);
} else if (args.find && !args.path) {
    log.error('Package name must be specified with --find');
    process.exit(-1);
} else if (!args.path.endsWith('.fuel') && (args.install || args.run)) {
    log.error('Only packages can be specified with --install or --run');
    process.exit(-1);
} else if (args.find && args.install) {
    log.error('--install must not be specified with --find');
    process.exit(-1);
}

// setup a temporary folder for unzipping packages which are not being installed
const tmpDir = tmp.dirSync({ unsafeCleanup: true });
tmp.setGracefulCleanup();

let config = configurator.loadConfiguration(),
    server;

if (!config) {
    log.error('Unable to load configuration');
    process.exit(-1);
}
if (config.debugging) {
    log.enable('debug');
}
log.enable('info');

function launchApp(app) {
    if (app && app.isLayoutValid() && (!app.isSigned() || app.isSignatureValid())) {
        return app.launch(config, (err) => {
            if (err) {
                log.error(`app exited with error ${err}`);
            }
            process.exit(err ? -1 : 0);
        });
    }
}

if (args.config) {
    server = launchApp(configurator.path);
} else {
    if (args.find) {
        const appPath = config.installed[args.path];
        log.info(`Found installed package at ${appPath}`);
        if (args.run) {
            server = launchApp(new FuelApp(appPath));
        }
    } else if (args.install || args.run) {
        const packagePath = args.path;
        log.info(`Opening package from ${packagePath}`);
        let appName = packagePath.slice(path.lastIndexOf('/'));
        appName = appName.slice(0, appName.length - '.fuel'.length);
        let appPath = args.install ? config.cacheDir : tmpDir.name;
        appPath += '/' + appName;
        const package = new FuelPackage();
        package.open(packagePath, appPath)
            .then((app) => {
                if (args.run) {
                    server = launchApp(app);
                } else {
                    log.info(`Installed package at ${appPath}`);
                }
            });
    }
}