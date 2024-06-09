# TODO for FUEL

## common

- U Write basic package unzipping
- Write basic app shell
- U Switch to new validation model
- U Write app layout validation

## fuel-packager

- X Write argument parsing for fuel-packager
- Write packing code (fake signature)
- Write signing code

## fuel-engine

- Add a package-stats option
- Add a validate option
- Finish interface docs
  - maybe try a Jekyll site on Github Pages?
- Write basic app template
- Write the basic loader
- Write signature validation code
- Write basic server template
- Write service provider

## Ruminations #1

Thinking about this a bit deeper, what do the app and the package represent?
I am thinking about the package as the container and the app as what is contained.
So which one should be doing the validating?

### Package does the validation

This makes a certain amount of sense. The validation is all defined in terms of the package and its components. We really don't care about the contents of the components that are the functional bits (the servers, the app entry point, any resources). We only care about the container level stuff like what is the list of contained assets and have any of them changed. If I take this approach, then the package object also needs to be parsing the manifest and enumerating all the files. The app object would only be responsible for serving up the apps itself.

### App does the validation

This also makes a certain amount of sense. This would contain the parsing into the app itself. The package object would just do zipping and unzipping.

I think after thinking about these two, it would be more efficient to have the package do the validation. The parsing work really only needs to be done once and then we can release any of those resources. We should restrict construction of the app to only be from the package object. And we should allow the package object to open unzipped packages as well as zipped ones.

## Ruminations #2

How should I actually build the package? I have a few options here as well...

### Build from the files in-situ

This would mean taking each services list of contents, opening each files from the original location, digesting the file while open, and then writing the file into the compression stream with the path adjusted to place the file under the right package path.

## Build a deployment folder

This would involve creating an exploded version of the package in a tmp location, copying all the files into the correct locations, and then digesting the files and compressing the files from that location. This has an advantage from a debugging perspective because I can look at the resulting layout before deleting. It would also probably be easier to implement, although the other might not be too much more difficult. The disadvantage is that is would take longer since I am reading each file at least twice.

## Ruminations #3

What should my target language version be? ES2019 is supported by Node 12.8+ so that is easy to require. This should also be fairly easy to integrate apps written in older or newer versions of JS. https://web.dev/publish-modern-javascript

Should I use a compiler like Babel or Webpack? Do I really care if my target is not the browser, but node itself? My early impression is that I will not need to transpile unless I moved to Typescript or something else that needs it for the Configurator.

Can I make a pure web platform engine for FUEL packages? Should be not a problem, although some APIs may not be available.
Ideally this would let you install FUEL packages as PWAs.

## Future Stuff

Sites to read

- web.dev

Videos to watch from Chromedev 2020

- "Next Level Web Apps"
- "What's New in Dev Tools"

APIs to investigate

- WebAuthn
- WebSerial
- NativeSockets
- squoosh-v2
