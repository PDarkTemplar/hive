import aedesFn from 'aedes';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import aedesPersistenceMongoDB from 'aedes-persistence-mongodb';
import { createServer } from 'net';
import { createServer as createServerHttp } from 'http';
import ws from 'websocket-stream';

const settings = JSON.parse(fs.readFileSync(path.join(__dirname, 'settings.json'), 'utf8'));
const key = fs.readFileSync(path.join(__dirname, 'public.key'), 'utf8');

function verify(token) {
  try {
    jwt.verify(token, key, { algorithm: 'RS256' });
    return true;
  } catch (err) {
    return false;
  }
}

const authenticate = function (client, username, password, callback) {
  if (!client.conn.httpVersion) {
    callback(null, true);
    return;
  }

  if (password) {
    const authorized = verify(password.toString());
    if (authorized) client.token = password;
    callback(null, authorized);
    return;
  }
  callback(null, false);
};

const authorizePublish = function (client, packet, callback) {
  if (!client.conn.httpVersion) {
    callback(null);
    return;
  }
  if (client.token) {
    const verified = verify(client.token.toString());
    callback(verified ? null : new Error('token error'));
    return;
  }
  callback(new Error('token error'));
};

const authorizeSubscribe = function (client, subscription, callback) {
  if (!client.conn.httpVersion) {
    callback(null, subscription);
    return;
  }

  if (client.token) {
    const verified = verify(client.token.toString());
    if (!verified) {
      callback(new Error('token error'));
      return;
    }

    callback(null, subscription);
    return;
  }
  callback(new Error('token error'));
};

const persistence = aedesPersistenceMongoDB({
  url: settings.mongoUrl,
});

const aedes = aedesFn({ persistence: persistence });
const httpServer = createServerHttp();

aedes.authenticate = authenticate;
aedes.authorizePublish = authorizePublish;
aedes.authorizeSubscribe = authorizeSubscribe;

const server = createServer(aedes.handle);
ws.createServer({ server: httpServer }, aedes.handle);

server.listen(settings.mqPort, function () {
  console.log('server started and listening on port ', settings.mqPort)
});

httpServer.listen(settings.wsPort, function () {
  console.log('websocket server listening on port ', settings.wsPort);
});
