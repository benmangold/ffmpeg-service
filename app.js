const path = require('path');
const express = require('express');
const app = express();

const winston = require('winston');
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp': true});

const encoderRoutes = require(__dirname + '/app/routes/routes');
app.use('/', encoderRoutes);

app.use(express.static(path.join(__dirname, 'public')));

require('express-readme')(app, {
	filename: 'README.md',
	routes: ['/', '/readme'],
});
app.listen(3000, function() {
	winston.info('Launching App localhost:3000');
});

module.exports = app;
