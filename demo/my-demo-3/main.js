var express = require('express');
var app = express();

app.get('/', function(req, res, next) {
	// res.send('hello express.');
	console.log(0);
	next();
});

app.use(function(req, res, next) {
	console.log(1);
	next();
});

app.use(function(req, res, next) {
	console.log(2);
	next(new Error('this is a error.'))
});

app.use(function(req, res, next) {
	console.log(3);
});

app.use(function (err, req, res, next) {
  	console.error(err.stack)
  	res.status(500).send('服务器内部错误！')
});

app.listen(3030, function() {
	console.log('express start on: ' + 3030)
});