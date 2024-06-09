# FUEL Package Manifest

## Manifest Specification

The package manifest `manifest.json` is a JSON file stored at the root of the package structure. It contains the list of services in the package and metadata about the package.

`manifest.json` example contents:
{
    "name":"The Big Package",
    "description": "A longer description of what this package has in it",
    "version":"1.0",
    "services":[ "app", "default" ]
}

### Field: packageName

- Required
- A string containing the short name for the package.

### Field: packageDescription

- Optional
- A longer string describing the service.

### Field: packageVersion

- Required
- A string containing the server version in the format: major.minor\[.build\]. Major and minor are integers. Build is optional and may contain any valid JSON characters after the `.` separator.

### Field: packageServices

- Required
- An array of strings where each string is a service name corresponding to subfolder in the unzipped package. A package MUST have at least one service defined.

## Service Specification

A service is contained in a subfolder under the root of the package. This subfolder is named with the service name referenced in `manifest.json`. Any local files referenced by service should be contained in this subfolder.
Each service has a `server.json` file in the top level of this subfolder that defines the service, similar how `manifest.json` described the package.

`server.json` example contents:
{
    "name":"default",
    "description":"The Default Server",
    "version":"1.0",
    "port":3000,
    "interface":"index.html",
    "visibility":"public|private",
    "contents": [ "index.html" ]
}

### Field: name

- Required
- A string containing the short name for the service and the folder within the package containing the entry point and any other resources used directly by the service (e.g. images, scripts, CSS, etc.).

### Field: description

- Optional
- A longer string describing the service.

### Field: version

- Required
- A string containing the server version in the format: major.minor\[.build\]. Major and minor are integers. Build is optional and may contain any valid JSON characters after the `.` separator.

### Field: port

- Optional
- The port at which the service will be hosted on localhost. If a port is not specified, then the port chosen is engine-specific.

### Field: interface

- Required
- The file to load containing the starting page of the service.

### Field: visibility

- Optional
- This can be `public` or `private`. The default if this field is not present is `public`. The intent of the visibility field is to control whether the service access URI is published and therefore made "visible" to the user. The actual behavior is engine-specific.

### Field: contents

- Required
- An array containing the complete list of all files required by the service, including the path from the service root. E.g. if a required file is at "package-root/server-name/subfolder/foo.js" then `contents` MUST contain "subfolder/foo.js".
