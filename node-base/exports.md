#### exports

exports对象在当前模块中导出一个对象（可以是方法，也可以是属性）供其它模块使用。就如同我们上面require函数一样，它引用的实际上就是exports这个对象。

```
exports.hello = function () {
	console.log('hello world');
}
```

exports 和 module.exports 的区别是，exports 导出的是引用，而module.exports 导出的是对象。

  exports = module.exports = {}

补充：

export，import 是es6支持的引入和导出。

在一个文件中export和import都可以有多个，它们可以用于常量，函数，文件，模块等操作。

其中导出有两种方式，一种是export，另一种是export default 如下：

export 可以导出表达式，而export default则不行。如果不是表达式，export的导出需要用 `{}` 包括，而export default不需要，示例如下：

```
export const a = 1;
export const hello = function() {
  console.log('hello nodejs');
};

const hello = function() {
  console.log('hello nodejs');
};
export {hello};

export default hello;

```

在文件中export default只能出现一次。