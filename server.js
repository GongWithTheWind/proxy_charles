require('dotenv').config();
// require('newrelic');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const app = express();
var cors = require('cors');
app.use(cors());
var proxy = require('express-http-proxy');
const PORT = process.env.PORT || 3000;
app.use(logger('dev'));

// REDIS IMPLEMENTATION
// var redis = require('redis');
// var client = redis.createClient(6379, '27.0.0.1', {
//   no_ready_check: true
// });
// client.on('connect', function() {
//   console.log('Redis client connected');
// });

app.use('/:id', express.static('public'));
app.use('/house', (req, res, next) => {
  req.url = '/house' + req.url;
  next();
});
app.use('/house', proxy('Lb-1291171679.us-east-1.elb.amazonaws.com'));

app.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
