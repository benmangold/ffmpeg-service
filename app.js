const express = require('express');
const app = express();

/* Winston Logger Configuration */
const winston = require('winston');
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { timestamp: true });

/* Audio Conversion Routes - MP3, M4A */
const encoderRoutes = require(`${__dirname}/app/routes/routes`);
app.use('/', encoderRoutes);

/* Expose README.md to appropriate GET routes */
require('express-readme')(app, {
  filename: 'README.md',
  routes: ['/', '/readme'],
});

/* Initialize Server */
app.listen(3000, function() {
  winston.info('Launching App localhost:3000');
});

module.exports = app;
