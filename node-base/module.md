### 模块

由于nodejs使用的是 `CMD` 模块管理系统（[commnjs](http://javascript.ruanyifeng.com/nodejs/module.html)），对于我们编写的每个模块都有 `require` , `exports` , `module` 三个变量可以使用。

模块一旦被调用，就会初始化该模块的导出对象，然后会缓存起来，方便以后的使用。

补充：

Node.js的模块分为核心模块和文件模块（.js, .node, .json）。核心模块在编译的时候编译进了二进制执行文件，加载速度快。而文件模块是动态加载的，加载速度比核心模块要慢。不管是核心模块还是文件模块在第一次被引入时，都进行了缓存，在第二次require时，是不会有重复的开销的。

### 深入了解模块

[require引入模块]()

[export导出对象]()

### module

module对象用于导出当前模块的相关信息。使用exports默认导出一个普通对象，富国想要导出一个函数可以使用 `module.exports` ，代码如下：

```
module.exports = function () {
    console.log('Hello World!');
};
```

### 主模块

在nodejs的项目中有一个特殊的模块，这个模块就是主模块，启动整个项目就是从这个模块开始，这个模块在nodejs中默认为 `main.js` 。

在控制台中我们输入 `node main.js` 命令，就可以启动整个项目。