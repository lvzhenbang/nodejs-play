## mongodb

mongodb 这个名词我以前也只是听说，不过随着nodejs越来越火，这个东西也被人们挂在口头，我有兴趣也对它进行了深入学习。

mongodb 令人印象深刻就是它所提出的文档型这个概念。

不过，文档型这个概念一开始，人们都会进入思维的误区就是 `文档` 二字。这个文档就是bson，它是json的超集。如：json中没法存储二进制类型，但bson却提供了二进制的支持。

mongodb中的每一条记录都是由bson来表示的。因此，它通常被人理解为存哈希数据的数据库或是存bson数据的数据库。

mongodb和sql中的概念是一一对应的，如下：

```
sql               mongodb         描述
database		  database		  数据库
table 			  collection	  数据库表/集合
row 			  document        数据记录/文档
column			  field			  数据字段/域
index			  index			  索引
primary key		  primary key	  主键/mongodb以_id字段为主键
table joins						  表连接/mongodb不支持
```
mongodb中的document是可以嵌套的，而sql中的记录只能是一维的。

mongodb中表于表之间是没有关系的，而sql则可以通过外键建立联系。

在我们选择使用那种数据库的前，我们要实现确定是否要进行表于表之间的连接，要不要支持事务。

### mongoose

再node中我们经常用mongoose这个插件来操作mogodb数据库。

mongoose是个odm（Object-Document  Mapping），中文叫做对象文档映射。

mongoose定义了数据库中数据的格式，当我们使用它取数据时，它可以把数据库中的数据通过odm转换为一个对象。这个对象拥有 `save()` ， `update()`, `title` ，  `author` 等一系列方法和属性。当我们使用这些方法时，mongoose它会将我们使用的方法请求转换为shell命令发送到mongodb数据库。同时mongoose支持链式调用这些方法，这样我们写数据库操作语句将更加灵活和便利。

mongodb的安装我就不在这里做介绍了，你可以参考[菜鸟教程 mongodb](http://www.runoob.com/mongodb/mongodb-tutorial.html)，这里面介绍了各系统的mongodb下载与安装。

### mongoose 快速上手

下面我们引入一个官方例子来说明一下：

```
// 引用mongoose
const mongoose = require('mongoose');

// 连接mongoose数据库，如果不存在my-cat数据库，mongodb将创建该数据库
mongoose.connect('mongodb://localhost/my-cat');

// 调用mongoose的表结构对象
const Schema = mongoose.Schema;

// 实例化一个表结构 CatSchema
const CatSchema = new Schema({
	name: { type: 'string', required: true },
});

// 初始化一个Cat表数据对象模型
const Cat = mongoose.model('Cat', CatSchema);

// 实例化一个对象模型
const Kitty = new Cat({name: 'jmmy', age: 3});

// 调用save方法向数据 my-cat 传送数据 
Kitty.save().then(() => console.log('meow'))

```


> `Schemas` , `Models`，`Documents` 究竟是什么?

Schemas 声明了一个结构，我们还可以为CatSchema添加方法。

```
CatSchmea.methods.speak = function () {
	var greeting = this.name ? '喵的名字是' + this.name + ', 今年' + this.age + '岁了。' ： '哎，本喵还没有名字。';

	console.log(gretting);
};

```

Models 是一个构造文档(Documents)的类，它的实例化对象可以调用speak方法。

```
Kitty.save().then((err, kitty) => kitty.speak())
```

Documents 是一个具有Schemas声明的属性和行为的Mdels实例，也即是数据记录，也即是Kitty。

最终代码如下：

```
const mongoose = require('mongoose');
// 调用mongoose的表结构对象
const Schema = mongoose.Schema;

// 实例化一个表结构 CatSchema
const CatSchema = new Schema({
	name: { type: 'string', required: true },
});

// 添加一个speak方法
CatSchmea.methods.speak = function () {
	var greeting = this.name ? '喵的名字是' + this.name + ', 今年' + this.age + '岁了。' ： '哎，本喵还没有名字。';

	console.log(gretting);
};

// 初始化一个Cat表数据对象模型
const Cat = mongoose.model('Cat', CatSchema);

// 实例化一个对象模型
const Kitty = new Cat({name: 'jmmy', age: 3});


// 调用save方法向数据 my-cat 传送数据 
Kitty.save().then((err, kitty) => kitty.speak())
```

