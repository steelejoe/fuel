/*
 * FUEL packager
 */

const ArgParser = require('argparse'),
    packageLoader = require('../common/packageLoader'),
    Package = require('../common/Package'),
    { version } = require('./package.json');

const parser = new ArgParser({
    description: 'fuel-packager - FUEL package builder'
});

parser.add_argument('-v', '--version', {
    action: 'version',
    version
});
parser.add_argument('-t', '--test', {
    type: 'str',
    help: 'fuel-packager --test /path/to/package.fuel|/path/to/package-root',
    description: 'Validate FUEL package is complete'
});
parser.add_argument('-b', '--build', {
    type: 'str',
    help: 'fuel-packager --build /path/to/package-root',
    description: 'Build FUEL package based on the contents of package-root passed'
});
parser.add_argument('-o', '--output', {
    type: 'str',
    help: 'fuel-packager --output /path/to/package',
    description: 'Name of FUEL package to use when building'
});
const args = parser.parse_args();

if (args['--version']) {
    console.log(version);
    return;
}
if (!args.test && !args.build) {
    throw new Error('missing required argument: --test OR --build');
}
if (args.test) {
    if (args.build) {
        console.log('Test param ignored - builds are always tested');
    } else if (args.output) {
        console.log('Output param ignored - only builds have output');
    }
}
if (path.endsWith('.fuel')) {
    console.log('trying to open package');
    // unzip the package to a temporary folder
    // set path to the new location
}
/* TODO implement the validation code
    look for each required file in the layout
    look for at least one server/app
    parse main manifest and check for required fields
    parse server/app manifests and check for required fields
*/

/* TODO implement the packing code
    open output file - use output name if provided otherwise default
    iterate through the files mentioned in the manifests and pack them into output
*/