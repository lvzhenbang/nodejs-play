### 模块

由于nodejs使用的是 `CMD` 模块管理系统（[commnjs](http://javascript.ruanyifeng.com/nodejs/module.html)），对于我们编写的每个模块都有 `require` , `exports` , `module` 三个变量可以使用。

模块一旦被调用，就会初始化该模块的导出对象，然后会缓存起来，方便以后的使用。

补充：

Node.js的模块分为核心模块和文件模块（.js, .node, .json）。核心模块在编译的时候编译进了二进制执行文件，加载速度快。而文件模块是动态加载的，加载速度比核心模块要慢。不管是核心模块还是文件模块在第一次被引入时，都进行了缓存，在第二次require时，是不会有重复的开销的。

### 深入理解模块

模块的引用（require）
模块的定义（exports）
模块的标识（就是传递给require()方法的参数，可以是相对路径也，可以是绝对路径，亦可以是模块名）

#### require

在模块中上下文提供require()方法来引入外部模块，代码如下：

```
var http require('http');
```
#### module 和 module.exports

在模块中，还有一个module对象，它代表模块本身，用于导出当前模块的相关信息。module有一个属性exports，exports也是一个对象，它用于导出当前模块的方法和变量（它是唯一的导出口）。在Node中，一个文件就是一个模块，将方法挂载在exports上既可以定义到处方式，代码如下：

```
exports.add = function (a, b) {
    return a + b;
};
```

但是，我们发现上面的代码无法运行，主要原因是模块形成的作用域问题，  `exports.add` 是形参引用的修改，要想add()方法可以被引用的模块使用，需要使用 `module.exports.add` 。

到这里，我们对Node模块就有了基本的认识，下面来进行知识的扩充。

### 主模块

在nodejs的项目中有一个特殊的模块，这个模块就是主模块，启动整个项目就是从这个模块开始，这个模块在nodejs中默认为 `main.js` 。

在控制台中我们输入 `node main.js` 命令，就可以启动整个项目。

### 模块的使用

一般模块的首次使用需要经历如下三个阶段。由于Node存在缓存机制（这种机制可以减少二次引入的开销）：

```
1.路径的分析
2.文件的定位
3.编译执行
```

提示：在文件定位的中，require在分析标识符的过程中，我们可以省略文件扩展名（Node会按照.js, .json, .node的顺序依次补足扩展名），但是随之而来的是性能问题，主要原因式Node单线程的阻塞时调用，对于.json, .node文件我们可以加上扩展名，同时配合缓存可以解决该问题。

### 模块分类

核心模块（Node提供的模块，它的引入不需要经历2，3两个阶段）

文件模块（用户自定义的模块）

### 模块的引入

![模块引入](https://github.com/lvzhenbang/nodejs-play/blob/master/imgs/module.png)

### 文件的定位

![文件定位](https://github.com/lvzhenbang/nodejs-play/blob/master/imgs/file.png)
