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
Example setup backup.

There is some IR codes in database:
- LG TV (on, off)
- Yamaha AV Receiver (on, off, sound up/down/mute)
- Hisense conditionare (timer on/off, all temperatures and speed for heat and cooling)

### node_red_with_modules
Node-RED example folder with modules.  

For instalation use 
*npm install*

For startup
*node "{path}/node_modules/node-red/red.js" --userDir "{path}/node_red_with_modules"*

### flows.json
exported flow for Node-RED.
## Frontend
Setup *dev.env*  for dev enviroment and *prod.env* for publish.
- MQTT_PATH - path to web socket MQTT broker
- LOGIN_PATH - path to auth server
- HOST - front path (for dev server should be on 4000 port)

run *npm install* for setup and *npm run-script server* for dev startup
