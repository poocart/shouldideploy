const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const path = require('path');

const { getRandom, dayHelper, IS_FRIDAY } = require('../src/js/constants');

let app = express();

const router = express.Router();

app.get('/api', function(req, res) {
  res.status(200).send({
    shouldideploy: !IS_FRIDAY,
    reason: getRandom(dayHelper()),
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/.netlify/functions/start', router);

app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

module.exports = app;
module.exports.handler = serverless(app);
