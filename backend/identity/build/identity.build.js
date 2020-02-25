"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _jsSha = require("js-sha512");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const settings = JSON.parse(_fs.default.readFileSync(_path.default.join(__dirname, 'settings.json'), 'utf8'));

const key = _fs.default.readFileSync(_path.default.join(__dirname, './private.key'), 'utf8');

function generateToken() {
  const signOptions = {
    expiresIn: '1h',
    algorithm: 'RS256'
  };
  return _jsonwebtoken.default.sign({
    login: true
  }, key, signOptions);
}

const app = (0, _express.default)();
app.use(_express.default.json());
app.use((0, _cors.default)());
const port = settings.port;
app.post('/local-auth', function (req, res) {
  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
  const isLocal = ip === '::1' || ip.indexOf('192.168') > -1 || ip.indexOf('127.0.0.1') > -1;

  if (!isLocal) {
    res.json({
      notLocal: true
    });
    return;
  }

  res.json({
    token: generateToken()
  });
});
app.post('/auth', function (req, res) {
  const login = req.body.login;
  const pass = req.body.password;

  if (login === settings.login && (0, _jsSha.sha512)(pass) === settings.password) {
    res.json({
      token: generateToken()
    });
    return;
  }

  res.json({
    wrongLoginOrPassword: true
  });
});
app.listen(port);
console.log('Server started!');
