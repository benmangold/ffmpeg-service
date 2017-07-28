const path = require('path');
const express = require('express');
const app = express();
const encoderRoutes = require(__dirname + '/routes');
app.use('/', encoderRoutes);
app.use(express.static(path.join(__dirname, 'public')));

const debug = require('debug')('my-namespace');
const name = 'my-app';
debug('booting %s', name);

require('express-readme')(app, {
	filename: 'README.md',
	routes: ['/', '/readme'],
});

app.listen(3000, function() {
	console.log('app listening on port 3000!');
});

module.exports = app;
