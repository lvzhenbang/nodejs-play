var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var app = express();

// 使用 cookieParser 中间件;
/*app.use(cookieParser());

app.get('/', function(req, res) {
    if (req.signedCookies.isFirst) {
        res.send("欢迎再一次访问");
        console.log(req.signedCookies)
    } else {
        res.cookie('isFirst', 1, { maxAge: 60 * 1000});
        res.send("欢迎第一次访问");
    }
});*/

// signeCookie
// 使用 cookieParser 中间件;
/*app.use(cookieParser('my_cookie_secret'));
app.get('/', function(req, res) {
    if (req.signedCookies.isFirst) {
        res.send("欢迎再一次访问");
        console.log(req.signedCookies)
    } else {
        res.cookie('isFirst', 1, { maxAge: 60 * 1000, signed: true});
        res.send("欢迎第一次访问");
    }
});*/

// session
app.use(session({
	name: 'session-name', // 这里是cookie的name，默认是connect.sid
	secret: 'my_session_secret', // 建议使用 128 个字符的随机字符串
	resave: true,
	saveUninitialized: false,
	// session cookie
	cookie: { maxAge: 60 * 1000, httpOnly: true },
	// 数据库session
	/*store: new redisStore({
		host: '127.0.0.1',
		port: '6379',
		db: 0,
		pass: '',
	})*/
}));


// route
app.get('', function(req, res) {
	if (req.session.isFirst) {
        res.send("欢迎再一次访问。");
        console.log(req.session)
    } else {
        req.session.isFirst = 1;
        res.send("欢迎第一次访问。");
    }
});

/*app.get('/', function(req, res, next) {
	if(req.session.isFirst || req.cookies.isFirst) {
        res.send("欢迎再一次访问");
	} else {
        req.session.isFirst = 1;
        res.cookie('isFirst', 1, { maxAge: 60 * 1000, singed: true});
        res.send("欢迎第一次访问。");
	}
});*/

app.listen(3030, function() {
	console.log('express start on: ' + 3030)
});