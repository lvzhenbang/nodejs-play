var path = require('path');
var db = require('./db/mongo');
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var connectMongo = require('connect-mongo');

var express = require('express');
var app = express();


var routes = require('./routes');

// 设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')));


// req-body
app.use(bodyParser.json({limit: '1mb'})); // parser appllication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true, limit: '1mb'})); // parser application/json

// session
/*var MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
	  name: config.session.name,
		secret: config.session.secret,
		resave: true,
		saveUninitialized: false,
		cookie: config.session.cookie,
		store: new MongoStore({
	  url: config.url
	})
}));*/

app.set('views', path.resolve(__dirname, 'src'));
app.set('view engine', 'ejs');

routes(app);

app.listen(3030, function() {
	console.log('express start on: ' + 3030)
});