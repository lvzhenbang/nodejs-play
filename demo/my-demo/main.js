var path = require('path');
var express = require('express');
var app = express();

app.get('/', function(req, res, next) {
	res.send('hello express.');
});

app.listen(3030, function() {
	console.log('express start on: ' + 3030)
});