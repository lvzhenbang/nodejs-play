## express中的session与cookie

### 无状态的http

我们都知道http的请求和响应式相互独立的，服务器无法识别两条http请求是否是同一个用户发送的。也就是说服务器端并没有记录通信状态的能力。我们通常使用cookie和session来确定会话双方的身份。

### cookie

cookie 是从服务器端发送的，服务器给不同的用户发送不同的标识，这个标识表示用户的身份，服务器通过客户端发送的这个标识来识别用户的身份，从而查询服务器中的该用户的相关数据，然后发送到该用户。

安装express提供的cookie-parser中间件：

	npm i -S cookie-parser

在我们使用的项目页面模块中引入 cookie-parser 插件，然后实例化它，如下：
	
```
var cookieParser = require('cookie-parser');

var cp = cookieParser(secret, options);

```

它有两个参数，第一个参数secret，用它可以对cookie进行签名，也就是我们常说的cookie加密。它可以是字符串也可以是数组，如果熟悉加密原理的同学应该知道，这个字符串就是服务器所拥有的密文，第二个参数options包含如下可选参数：

```
path：指定 cookie 影响到的路径
expires: 指定时间格式
maxAge：指定 cookie 什么时候过期
secure：当 secure 值为 true 时，在 HTTPS 中才有效；反之，cookie 在 HTTP 中是有效。
httpOnly：浏览器不允许脚本操作 document.cookie 去更改 cookie。设置为true可以避免被 xss 攻击拿到 cookie
```

参考[cookie-parser](https://github.com/expressjs/cookie-parser)中的例子，实现一个记住访问路径的demo，代码如下：

```
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

// 使用 cookieParser 中间件;
app.use(cookieParser());

// 如果请求中的 cookie 存在 isFirst
// 否则，设置 cookie 字段 isFirst, 并设置过期时间为10秒
app.get('/', function(req, res) {
    if (req.cookies.isFirst) {
        res.send("再次欢迎访问");
        console.log(req.cookies)
    } else {
        res.cookie('isFirst', 1, { maxAge: 60 * 1000});
        res.send("欢迎第一次访问");
    }
});

app.listen(3030, function() {
	console.log('express start on: ' + 3030)
});
```

cookie-parser 还可以对Cookie数据进行加密，也就是我们所说的signedCookies。

### signedCookies

实现代码如下：

```
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

// 使用 cookieParser 中间件;
app.use(cookieParser('my_cookie_secret'));

// cookie
app.get('/', function(req, res) {
    if (req.signedCookies.isFirst) {
        res.send("欢迎再一次访问");
        console.log(req.signedCookies)
    } else {
        res.cookie('isFirst', 1, { maxAge: 60 * 1000, signed: true});
        res.send("欢迎第一次访问");
    }
});
```

从上面的代码中我们知道cooke-parser的第一个参数可以指定服务器端的提供的加密密匙，然后我们使用options中的signed配置项可实现加密。虽然这样相对安全，但是客户端的Cookie有局限性，在客户端发送请求时会增加请求头部的数据量，导致请求速度变慢；另外它不能实现数据的共享。

### session

express-session 是expressjs的一个中间件用来创建session。服务器端生成了一个sessionn-id，客户端使用了cookie保存了session-id这个加密的请求信息，而将用户请求的数据保存在服务器端，但是它也可以实现将用户的数据加密后保存在客户端。

session记录的是客户端与服务端之间的会话状态，该状态用来确定客户端的身份。

> express-session支持session存放位置

可以存放在cookie中，也可以存放在内存中，或者是redis、mongodb等第三方服务器中。

session默认存放在内存中，存放在cookie中安全性太低，存放在非redis数据库中查询速度太慢，一般项目开发中都是存放在redis中(缓存数据库)。

在express提供的express-session中间件安装命令：

	npm i -S express-session

在我们使用的项目页面模块中引入 express-session 插件，然后实例化它，如下：
	
```
var session = require('express-session');

var se = session(options);
```

session()的参数options配置项主要有：

```
name: 设置cookie中，保存session的字段名称，默认为connect.sid
store: session的存储方式，默认为存放在内存中，我们可以自定义redis等
genid: 生成一个新的session_id时，默认为使用uid2这个npm包
rolling: 每个请求都重新设置一个cookie，默认为false
resave: 即使session没有被修改，也保存session值，默认为true
saveUninitialized：强制未初始化的session保存到数据库
secret: 通过设置的secret字符串，来计算hash值并放在cookie中，使产生的signedCookie防篡改
cookie : 设置存放sessionid的cookie的相关选项
```

那么，使用它我们都能做些什么呢？下面我们将一一介绍。

### cookie session

cookie session 使用很简单就是我们在配置项中使用cookie配置项,就可以将session数据保存在cookie中，它和signedCookies类似都是将数据保存在客户端，而且都对数据进行了加密，但是加密后的请求得到的数据结构不一样。

cooke session 的结构如下：

```
Session {
  cookie:
   { path: '/',
     _expires: 2018-01-29T17:58:49.950Z,
     originalMaxAge: 60000,
     httpOnly: true },
  isFirst: 1 }

```

signedCookie 结构如下：

```
{ isFirst: '1' }
```

实现cookie session代码如下：

```
var path = require('path');
var express = require('express');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var app = express();

// session
app.use(session({
	name: 'session-name', // 这里是cookie的name，默认是connect.sid
	secret: 'my_session_secret', // 建议使用 128 个字符的随机字符串
	resave: true,
	saveUninitialized: false,
	cookie: { maxAge: 60 * 1000, httpOnly: true }
}));

// route
app.get('/', function(req, res, next) {
	if(req.session.isFirst || req.cookies.isFirst) {
        res.send("欢迎再一次访问");
	} else {
        req.session.isFirst = 1;
        res.cookie('isFirst', 1, { maxAge: 60 * 1000, singed: true});
        res.send("欢迎第一次访问。");
	}
});

app.listen(3030, function() {
	console.log('express start on: ' + 3030)
});
```

> signed-cookie vs cookie session

* signedCookies 信息可见但不可修改，cookie session不可见也不可修改
* signedCookies 信息长期保存客户端，后者客户端关闭，信息消失

针对Cooke session增加了客户端请求的数据规模，我们一般这样使用，数据库存储session。

### 数据库保存session

用数据库保存session，我们一般使用redis，因为它是缓存数据库，查询速度相较于非缓存的速度更快。

express-session 的实例代码如下：

```
var path = require('path');
var express = require('express');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var app = express();

// session
app.use(session({
	name: 'session-name', // 这里是cookie的name，默认是connect.sid
	secret: 'my_session_secret', // 建议使用 128 个字符的随机字符串
	resave: true,
	saveUninitialized: false,
	store: new redisStore({
		host: '127.0.0.1',
		port: '6379',
		db: 0,
		pass: '',
	})
}));

// route
app.get('/', function(req, res) {
    if (req.session.isFirst) {
        res.send("欢迎再一次访问。");
        console.log(req.session)
    } else {
        req.session.isFirst = 1;
        res.send("欢迎第一次访问。");
    }
});

app.listen(3030, function() {
	console.log('express start on: ' + 3030)
});
```

但有时我们也使用非redis数据库保存session，这时我们就需要对项目结构有深刻的认识和理解；否则，使用后反而会适得其反。

另外，我们要注意使用数据库保存session数据，在浏览器端的session-id会随着浏览器的关闭而消失，下次打开浏览器发送请求时，服务器依然不能识别请求者的身份。

cookie session 虽然能解决这个问题，但是它本身存在着安全风险，其实cookie session 和 signedCookies都面临xss攻击。

其实，使用signedCookies和session的结合会在一定程度上降低这样的风险。

### signedCookies（cookies） 和 session的结合

在开发中，我们往往需要signedCookies的长期保存特性，又需要session的不可见不可修改的特性。

```
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var app = express();

// 使用 cookieParser 中间件;
app.use(cookieParser());

// session
app.use(session({
	name: 'session-name', // 这里是cookie的name，默认是connect.sid
	secret: 'my_session_secret', // 建议使用 128 个字符的随机字符串
	resave: true,
	saveUninitialized: false,
	// cookie: { maxAge: 60 * 1000, httpOnly: true },
	store: new redisStore({
		host: '127.0.0.1',
		port: '6379',
		db: 0,
		pass: '',
	})
}));

app.get('/', function(req, res, next) {
	if(req.session.isFirst || req.cookies.isFirst) {
        res.send("欢迎再一次访问");
	} else {
        req.session.isFirst = 1;
        res.cookie('isFirst', 1, { maxAge: 60 * 1000, singed: true});
        res.send("欢迎第一次访问。");
	}
});

app.listen(3030, function() {
	console.log('express start on: ' + 3030)
});
```

这样我们将session保存在redis中的信息，保存在了session_id所标示的客户端cooke中一份，这样我们就不用担心，浏览器关闭，cookie中的session_id字段就会消失的情况，因为浏览器中还有它的备份cookie，如果没有备份的cookie信息，下次客户端再次发出请求浏览就无法确定用户的身份。

[参考源码](https://github.com/lvzhenbang/nodejs-play/blob/master/demo/cookie)
