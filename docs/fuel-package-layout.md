# FUEL Package Layout

A FUEL package is a zip container containing a few standard files and at least one sub folder.
The default compression method supported is **DEFLATE** although I plan to include support for LZMA/XZ soon.

The minimum required layout looks like this.

package-root

- manifest.json
- signature.json
- server
  - server.json
  - index.html
