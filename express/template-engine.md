## 模板引擎

我们现在接触到的有 `vue` ， `ejs` 等，其实要说好用还是 `ejs` ，只是 `vue` 用的多了，所以就没有感觉，现在回想起来还是 `ejs` 更好。

### ejs模板

如果你使用过 `express-generator` 生成器你就会发现，它使用的模板引擎就是 `ejs` 。

`ejs` 安装命令如下：

npm install --save ejs

### 模板引擎使用

目录结构如下：

```
.
  ├── main.js 		   // 入口文件
  ├── route // 路由模块
  │	  ├── index        // index路由系统
  │   ├── about        // about路由系统
  ├── src // 项目模块
  │	  ├── index        // index模块
  │   ├── about        // about模块
```

项目入口文件 `main.js` 代码如下：

```
var path = require('path');
var express = require('express');
var app = express();

app.set('view engine', 'ejs'); // 设置视图引擎为ejs
app.set('views', path.resolve(__dirname, 'src')); // 设置示图的目录为 './src'

var indexRouter = require('./routes/index.js'); // 引用index.js 模块路由

var aboutRouter = require('./routes/about.js'); // 引用about.js 模块路由

app.use('/', indexRouter); // 启用路径为 '/' 的路由
app.use('/about', aboutRouter); // 启用路径为 '/about' 的路由

app.listen(3030, function() {
	console.log('express start on: ' + 3030)
});
```

路由系统(又被称为微型程序) `index.js` 代码如下：

```
var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', {hello: 'hello express'})
});

module.exports = router;
``` 

`index.js` 所对应的模板 `index.ejs` ：

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>index</title>
</head>
<body>
	<h1> <%= hello %> </h1>
</body>
</html>
```

路由系统(又被称为微型程序) `about.js` 代码如下：

```
var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
	res.send('its made by lzb.');
});

module.exports = router;
``` 

`index.js` 所对应的模板 `index.ejs` ：

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>about</title>
</head>
<body>
	
</body>
</html>
```

`package.json` 的shell配置如下：

```
"main": "main.js",
  "scripts": {
    "dev": "node main.js",
    "supervisor": "supervisor --harmony main.js"
  },
```

运行 `npm run dev` 这样一个命令项目就被启动了。

补充：

ejs工作原理：

[工作原理]((https://github.com/lvzhenbang/nodejs-play/blob/master/imgs/ejs.png)

ejs 处理服务器返回数据的方式，也即是ejs的常用语法：

1. <%= code %>

data将被转义为HTML内容，然后显示

2. <% code %>

data将会被当作JavaScript代码被处理，而不会被显示。

```
// data
fruits: ['apple', 'orange', 'banana']

// template
<ul>
<% for(var i = 0, len = fruits.length; i < len; i++) { %>
	<li> <%= fruits[i] %> </li>
<% } %>
</ul>

// ouput
<ul>
	<li>apple</li>
	<li>orange</li>
	<li>banana</li>
</ul>

```

3. <%- code %>

data将不会被转义，就像我们常用的注释一样，显示原始HTML内容（可参考include）

4. inclueds

`ejs` 模板引擎支持将模板拆分成一个个可复用的模块。

将 `index.ejs` 和 `about.ejs` 公用的代码提取出来放到 `./src/common` 目录下：


```
.
  ├── main.js 		   // 入口文件
  ├── route // 路由模块
  │	  ├── index        // index路由系统
  │   ├── about        // about路由系统
  ├── src // 项目模块
  │	  ├── index        // index模块
  │   ├── about        // about模块
  │   ├── common // 公用的模块
  │ 	  ├── header   // 公用头模块
  │       ├── footer   // 公用尾模块
```

`index.ejs` 视图 修改如下：

```
<%- include('common/header') %>

<ul>
<% for(var i = 0, len = fruits.length; i < len; i++) { %>
	<li> <%= fruits[i] %> </li>
<% } %>
</ul>

<%- include('common/footer') %>

```


`index.js` 路由系统 修改如下：

```
var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', {
		title: 'index',
		fruits: ['apple', 'orange', 'banana']
	})
});

module.exports = router;

```

新增 `header.ejs` 模块 代码如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title> <%= title %> </title>
</head>
<body>
```


新增 `footer.ejs` 模块 代码如下：

```
</body>
</html>
```

这样一个模块化的express demo就完成了。

更多ejs语法请看 [官方文档](https://github.com/tj/ejs)

[项目源代码](https://github.com/lvzhenbang/nodejs-play/blob/master/demo/my-demo-2)
