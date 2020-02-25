import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { sha512 } from 'js-sha512';

const settings = JSON.parse(fs.readFileSync(path.join(__dirname, 'settings.json'), 'utf8'));
const key = fs.readFileSync(path.join(__dirname, './private.key'), 'utf8');

function generateToken() {
  const signOptions = {
    expiresIn: '1h',
    algorithm: 'RS256'
  };

  return jwt.sign({ login: true }, key, signOptions);
}

const app = express();
app.use(express.json());
app.use(cors());

const port = settings.port;

app.post('/local-auth', function (req, res) {

  const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

  const isLocal = ip === '::1' || ip.indexOf('192.168') > -1 || ip.indexOf('127.0.0.1') > -1;

  if (!isLocal) {
    res.json({ notLocal: true });
    return;
  }

  res.json({ token: generateToken() });
});

app.post('/auth', function (req, res) {
  const login = req.body.login;
  const pass = req.body.password;

  if (login === settings.login && sha512(pass) === settings.password) {
    res.json({ token: generateToken() });
    return;
  }

  res.json({ wrongLoginOrPassword: true });
});

app.listen(port);

console.log('Server started!');
