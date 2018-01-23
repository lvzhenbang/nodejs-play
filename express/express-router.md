## 路由

它就是应用程序的uri以及uri响应客户端的请求的方式组成。

### 路由方法

express响应客户端请求的方式一部分是通过派生http方法，另一部分是自定义的，这些方法的类就是express，并且这些方法有一个统一的名字就是路由方法。

express的路由方法一共有将近30种方法，这些方法都有特定的用途，只需要了解就行，真正常用的也就那么几种。

```
app.get // get 方法请求路由到指定路径
app.post // post 方法请求路由到指定路径
app.put // put 方法请求路由到指定路径
app.render // 通过回调函数返回渲染的HTML
app.route // 返回单路由的实例
app.use // 挂在一个中间件到指定路径
app.set // 设置express提供的配置

```


使用示例代码如下：

```
app.get('[路由路径]'， function(req, res, next) {
	res.send('[访问该路径后所返回的内容]'),
	next(); // 移交控制权
});
```

我们通过next函数将控制权交给下一个中间件，如果当前中间件的请求违背执行完毕，那么next也就不会被调用，进而下一步要执行的中间件 将不会被执行。

但是要注意一点，并不是我们不用next就无法实现控制权的移交，在实际开发中，我们不使用next，express会自动查找要执行的下一个中间件，express使用了一个循环判断。这个暂时不理解的可以跳过，以后慢慢理解，不影响我们学习使用express。

### 路由路径

在应用程序中路由路径和方法的结合才能够访问应用程序的的某个端点。

在epxress中路由路径可以是字符串或正则表达式。

```
app.get('/index', function(req, res) {
	res.send('index')
});

app.get(/index[\.html]?/, funtion(req, res) {
	res.send('index')
});
```

### 路由处理程序

路由处理程序可以不止一个。

```
var a = function(req, res, next) {
	console.log('a')
};
var b = function(req, res, next) {
	console.log('b')
};
var c = function(req, res, next) {
	console.log('c')
};

app.get('/index', [a, b, c]);
```

### 请求处理方法

```
req.method // 客户端的请求方法
req.baseUrl // 路由名字
req.path // 请求路径
req.query // 解析url中的查询字符串
req.pareams // 解析url中的占位符
req.headers // 请求头
req.body // 解析请求体，我们一般使用 body-parser 插件
```

express的请求处理方法有20多种


### 响应方法

express的响应客户端请求的方法有9种，

```
res.send // 发送各种类型的响应
res.sendStatus // 设置响应状态码并以响应主体形式发送其字符串表示
res.render // 发送并呈现视图模板
res.json // 发送 JSON 响应
res.jsonp // 发送支持jsonp的 JSON 响应
res.redirect // 重定向请求
res.end // 结束响应请求
res.sendFile // 发送文件
res.end // 结速进程响应
res.download // 下载文件
```

### 路由系统

路由系统是一个模块化的路由，该模块化路由又被称为微型应用程序。

应用程序中的路由一般不只是一两个，为了方便管理，我们一般希望使用一个模块进行单独管理。

在express中，通过使用express.Router类创建的实例router作为一个路由系统，通过它来定义一些路由。

`router.js` 模块文件代码如下：

```
var express = require('express');

var router = express.Router();

router.get(/index, function(req, res) {
	res.send('index');
});

router.get('/about', function(req, res) {
	res.send('about');
});

module.exports = router;

```

项目入口文件使用该模块：

```
var express = require('express');
var router = require('./router.js');
var app = express();

app.use('/', router);
```

