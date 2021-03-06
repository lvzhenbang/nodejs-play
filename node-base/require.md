### require

这个个函数可以在本模块引入别的模块，传入模块的路径，返回引用模块的导出对象。

	var foo = require('./foo');

require 引用某个模块，可以省略具体模块的名字，而到所引用的包名即可，如果包中有package.json且指定了main字段，则引入main字段指定的文件；如果没有，则在包中尝试找 `index.js` 和 `index.node` 文件。


注：传入的路径可以是相对路径（以./开头），也可以是绝对路径（以/或C:之类的盘符开头）。

注2：不仅可以引用js文件，也可以引用json文件

注3：require引用过的文件会被缓存，如果还有其它模块引用该文件，将会直接使用缓存。

### 注意问题

1.异步使用require

require 引用其它文件块到自身模块的过程是同步，如果被引用的模块中使用异步导出对象，将会返回一个空对象。如下面的代码：

```
setTimeout(() => module.exports = () => console.log('hello nodejs') , 30)
```

2.引用循环：

比如在一个项目中用三个文件块：a,b,c，其中a应用了b，b引用了c，c引用了a，这样就形成了一个循环，这样的结果就是导出一个空对象 （{}）。

我们一般有两种解决办法：第一种，去掉循环中的一环；第二种，找出造成这种循环的共用代码，然后新加一个文件块。