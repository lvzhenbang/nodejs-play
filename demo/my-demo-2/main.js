var path = require('path');
var express = require('express');
var app = express();

app.set('views', path.resolve(__dirname, 'src'));
app.set('view engine', 'ejs');

var indexRouter = require('./routes/index.js');

var aboutRouter = require('./routes/about.js');

app.use('/', indexRouter);
app.use('/about', aboutRouter);

app.listen(3030, function() {
	console.log('express start on: ' + 3030)
});