# HIVE
Home automation with Node-RED and custom interface

## Backend
In *broker* and *identity* there is build folder.
### broker
mqtt broker builded with [aedes](https://github.com/moscajs/aedes "aedes"). MongoDB needed for persistance. 

In **settings.json** you could change *wsPort* , web socket port for frontend. *mqPort* for internal server interaction and *mongoUrl* for persistance.

You should specify  **RS256** public key in *public.key* for frontend auth.
### identity
JWT server for frontend auth. 

In **settings.json** you could change *port* , *login* and *password* as **SHA512**.

You should specify  **RS256** private key in *private.key* for frontend auth.
### modules
Custom Node-RED modules.

- node-red-contrib-openzwave
- node-red-cron-scheduler
- node-red-mqtt-dynamic

### mongo_backup

