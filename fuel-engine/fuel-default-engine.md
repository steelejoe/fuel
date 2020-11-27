# FUEL Default Engine


# The default engine

The default engine is written in Javascript and intended to run on top of node. The version of node is not yet determined but probably v12 LTS.
The default engine will also rely on a browser to display its UI.

## Installing the default engine

The engine can be installed by cloning the github repo and running `npm install` from the root folder or by using a package manager like Brew. (eventually)

## Running the default engine

The engine will be "installed" as a command line alias or batch script. Basically it will launch the installed node and run the fuel-engine.js script with an optional fuel package. Console output will be limited to debugging output and the initial information about the served URL(s). 

## Running the default engine without a package

If the engine is started without a package, the server started will run at a pre-determined port FUELPORT on the localhost. If the URL https://localhost:FUELPORT/config is accessed in the browser, it will return the global configuration UI for the FUEL server. The content used to build this UI is baked into the FUEL engine.

## Installing a package

The first time a package is run, the user is asked if they want to install the package. If they say yes, then any security permission responses given later will be persisted as an association with this package. If not, then permissions are transient.


## Stopping the engine

The engine can be stopped by a shutdown command from the server itself OR by killing the node process (e.g. with CTRL-C).

