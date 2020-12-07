/*
 * FUEL packager
 */

const fs = require('fs'),
    tmp = require('tmp'),
    unzipper = require('unzipper'),
    { ArgumentParser } = require('argparse'),
    { version } = require('./package.json');

const parser = new ArgumentParser({
    description: 'fuel-packager - FUEL package builder'
});

parser.add_argument('-v', '--version', {
    action: 'version',
    version
});
parser.add_argument('-t', '--test', {
    type: 'str',
    help: 'Test a built FUEL package or a folder containing FUEL package contents'
});
parser.add_argument('-b', '--build', {
    type: 'str',
    help: 'Build FUEL package based on the contents of package-root passed'
});
parser.add_argument('-o', '--output', {
    type: 'str',
    help: 'Name of FUEL package to use when building'
});
const args = parser.parse_args();

if (args['--version']) {
    console.log(version);
    return;
}
if (!args.test && !args.build) {
    throw new Error('Missing required argument: --test OR --build');
}
if (args.build && args.build.endsWith('.fuel')) {
    throw new Error('Only testing is supported for prebuilt packages');
}

let path = args.build || args.test;
if (args.test) {
    if (args.build) {
        console.log('Test param ignored - builds are always tested');
    } else if (args.output) {
        console.log('Output param ignored - only builds have output');
    }
}
let outputDir;
if (args.test && path.endsWith('.fuel')) {
    outputDir = tmp.dirSync({ unsafeCleanup: true });
    console.log('trying to unzip package into ' + outputDir.name);
    fs.createReadStream(path).pipe(unzipper.Extract({ path: outputDir.name }));
    path = outputDir.name;
}

/* TODO implement the validation code
    confirm manifest.json is present and valid
    confirm manifest.json has all required fields
    confirm at least one service is defined
    iterate through all defined services and:
        confirm server.json is present
        confirm server.json has all required fields
        confirm contents contains at least the file reference in `interface`
        iterate through all contents and confirm file is present
*/

/* TODO IF BUILDING - implement the signing code
    verify the credential for signer
    construct the signature.json contents (TBD)
    calculate the contents digest
    sign the contents digest
    add contents, signingFormat, signer and signature to signature.json
*/

/* TODO IF BUILDING - implement the packing code
    open output file - use output name if provided otherwise default
    iterate through the files mentioned in the signature.json and pack them into output
    add signature.json to the output
    close the output file
*/

if (args.test && outputDir) {
    tmp.setGracefulCleanup();
    outputDir.removeCallback();
}