## 网络操作

nodejs为前端开发人员打开了一个网络编程的窗口。通过它，我们可以写一些服务端的程序来协助前端的开发和测试。

此外，我们还可以学习一些HTTP协议与Socket协议相关的知识。

### http 内置模块

作为服务端使用时，会创建一个HTTP服务器，并监听HTTP客户端请求并返回响应；作为客户端使用时，发起一个HTTP客户端请求，获取服务端的响应。

##### http服务器

http.Server 是http模块的服务器对象。

```
var http = require("http");
var server = http.createServer(function(req,res) {
	res.writeHead(200, {"Content-Type":"text/html"});
	res.write("<h1>hello world</h1>");
	res.end();
});

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

```
var server = new http.Server();
server.on('request', function(req,res) {
	res.writeHead(200,{"Content-Type":"text/html"});
	res.write("<h2>hello world</h2>");
	res.end();
});

server.listen(8080, function() {
	console.log('app start at port 8080.');
});
```
