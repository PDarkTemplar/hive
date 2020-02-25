"use strict";

var _aedes = _interopRequireDefault(require("aedes"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _aedesPersistenceMongodb = _interopRequireDefault(require("aedes-persistence-mongodb"));

var _net = require("net");

var _http = require("http");

var _websocketStream = _interopRequireDefault(require("websocket-stream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const settings = JSON.parse(_fs.default.readFileSync(_path.default.join(__dirname, 'settings.json'), 'utf8'));

const key = _fs.default.readFileSync(_path.default.join(__dirname, 'public.key'), 'utf8');

function verify(token) {
  try {
    _jsonwebtoken.default.verify(token, key, {
      algorithm: 'RS256'
    });

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

const persistence = (0, _aedesPersistenceMongodb.default)({
  url: settings.mongoUrl
});
const aedes = (0, _aedes.default)({
  persistence: persistence
});
const httpServer = (0, _http.createServer)();
aedes.authenticate = authenticate;
aedes.authorizePublish = authorizePublish;
aedes.authorizeSubscribe = authorizeSubscribe;
const server = (0, _net.createServer)(aedes.handle);

_websocketStream.default.createServer({
  server: httpServer
}, aedes.handle);

server.listen(settings.mqPort, function () {
  console.log('server started and listening on port ', settings.mqPort);
});
httpServer.listen(settings.wsPort, function () {
  console.log('websocket server listening on port ', settings.wsPort);
});
