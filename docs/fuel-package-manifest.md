# FUEL Package Manifest

## The Manifest

The package manifest `manifest.json` is a JSON file stored at the root of the package structure. It contains the list of services in the package and metadata about the package.

`manifest.json` example contents:
{
    "name":"The Big Package",
    "description": "A longer description of what this package has in it",
    "version":"1.0",
    "services":[ "app", "default" ]
}

## Services

Services are launched with the port assigned in the manifest, or if one is not provided with a random port in the range TBD. If the "visibility" of the server is marked as "private" the URL for talking to the server is not echoed to the std output. In this case it can be retrieved by other services launched from the same package using the "service" API. 

The contents of each server are in a subfolder named for the server. The server has a `server.json` similar to the overall package `manifest.json`. The server manifest contain the entrypoint and metadata about the server.

`server.json` example contents:
{
    "name":"default",
    "description":"The Default Server",
    "version":"1.0",
    "port":3000,
    "entryPoint":"./index.html",
    "visibility":"public|private"
}
