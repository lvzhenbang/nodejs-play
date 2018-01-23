## 中间件

在express中，中间件是用来处理请求的。

也就是我们常见如下代码中的回调函数。

```
app.get('/', function(req, res, next) {
	res.send('hello express.')
});
```

我们可以将函数用中间件来代替，如下代码所示：

```
var middle = function(req, res, next) {
	res.send('hello express.')
};

app.get('/', middle);
```

在回调函数中有三个参数，前两个我们经常用，req处理请求参数，res返回请求结果，next的作用就是用用来调用下一个中间件。

修改入口文件 `main.js` 代码如下：

```
var path = require('path');
var express = require('express');
var app = express();

app.get('', function(req, res, next) {
	res.send('hello express.');
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

app.listen(3030, function() {
	console.log('express start on: ' + 3030)
});
```

我们会看到下图所示的结果：

[next-error](https://github.com/lvzhenbang/nodejs-play/blob/master/imgs/middleware.png)

我们发现当一个中间件完成，如果调用next()，就会请求下一个中间件，如果执行中间件出现错误，将阻止调用下一个中间件，所以上面的代码执行后没有在控制台打印出 `3` 。

### 错误提示

在使用中间件的过程中可能会出现一些，而为了从客户端查看请求信息，我们一般需要服务器端提示错误信息。

如何使用 express 内置的错误处理器呢，一般我们需要自定义一个错误处理的中间件。

修改 `index.js` 文件代码如下:

```
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

// 服务端自定义错误处理中间件
app.use(function (err, req, res, next) {
  	console.error(err.stack)
  	res.status(500).send('服务器内部错误！')
});

app.listen(3030, function() {
	console.log('express start on: ' + 3030)
});
```

因为我们要使用错误处理中间件用res.send()来处理错误信息，所以我们要修改app.get()中的代码，