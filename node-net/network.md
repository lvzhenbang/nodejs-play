## 网络操作

nodejs为前端开发人员打开了一个网络编程的窗口。通过它，我们可以写一些服务端的程序来协助前端的开发和测试。

此外，我们还可以学习一些HTTP协议与Socket协议相关的知识。

### http 内置模块

作为服务端使用时，会创建一个HTTP服务器，并监听HTTP客户端请求并返回响应；作为客户端使用时，发起一个HTTP客户端请求，获取服务端的响应。

### http服务器

http.Server 是http模块的服务器对象。

```
var http = require("http");
var server = http.createServer(requestHandler);

function requestHandler(req,res) {
	res.writeHead(200, {"Content-Type":"text/html"});
	res.write("<h1>hello world</h1>");
	res.end();
}

server.listen(8080, function() {
	consoel.log('app start on port 8080');
});
```

http.createServer 创建了一个http.Server的实例，传入一个函数作为HTTP请求处理函数，这个函数有两个参数：req和res（它们是对象）。

* res可以显示的写回响应状态码，如：200
* res可以指定响应头，如："Content-Type":"text/html"
* res可以指定响应体，如：res.write("<h1>hello world</h1>")
* res可以结束响应并发送给客户端

最后，我们通过http.Server的实例调用listen来启动服务器并制定监听的端口号。

其实，http.Server实现代码如下：

```
var server = new http.Server();
server.on('request', requestHandler);


function requestHandler(req,res) {
	res.writeHead(200, {"Content-Type":"text/html"});
	res.write("<h1>hello world</h1>");
	res.end();
}

server.listen(8080, function() {
	console.log('app start at port 8080.');
});
```

服务器端的请求函数 `requestHandler` 它是所有的http请求的处理函数，也即是说它是所有请求的入口函数。

这时，我们在浏览器的地址栏中 `http://localhost:8080` 后添加任何路径它都返回 `hello world` 。

### 回调函数嵌套

但是我们写服务端代码时往往会出现回调函数的嵌套，有的可能因为业务逻辑的复杂性，导致出现十几层的毁掉，这种现象我们称之为回调金字塔问题。

我在网上找到了四种解决方案：

* [EventProxy](https://github.com/JacksonTian/eventproxy) 事件的发布-订阅模式
* [BlueBird](https://github.com/petkaantonov/bluebird) Promise
* [Async](https://github.com/caolan/async) 异步流程控制库
* [Generator](http://es6.ruanyifeng.com/#docs/generator) ES6原生的Generator

这四种方法，我只是用过前三种，第四种暂时没来的及实践。

第一种方案的推荐开源项目[node-club](https://github.com/cnodejs/nodeclub)

第三种方案的推荐开源项目[node-elm](https://github.com/bailicangdu/node-elm)

### express

我们都知道express可以解决多层嵌套的问题，那么它使用的是什么呢？

在epxress我们可以使用路由模块来解决这个问题，而express的路由模块时connect的升级版本，所以我们要了解connect的解决方案。

connect使用的就是异步流程控制来解决多重回调的问题。