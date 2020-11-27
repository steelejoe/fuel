# FUEL Package Manifest

## The Manifest

The package manifest `manifest.json` is a JSON file stored at the root of the package structure. It contains a list of servers in the package and metadata about the package.
`manifest.json` example contents:
{
    "version":"1.0",
    "packageName":"The Big Package",
    "servers":[ "default" ],
}


## Servers

The contents of each server are in a subfolder named for the server. The server has a `server.json` similar to the overall package `manifest.json`. The server manifest lists the files included in the server and metadata about the server.
`server.json` example contents:
{
    "serverName":"default",
    "serverDescription":"The Default Server",
    "serverVersion":"1.0",
    "serverImpl":"./server.js",
    "entryPoint":"./index.html",
    "contents":[
        "./index.html"
    ]
}
