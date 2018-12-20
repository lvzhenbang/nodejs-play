# mongoose 再认识(一)

`mongoose` 是一个ODM(Object Data Model)的库，也叫做对象数据模型。那么为什么说是`对象数据模型`呢？

注：MongoDB或者Mongo是NoSQL类型的数据库，也就是说是非关系型的数据库。

它被用来处理数据，实现对象间的转换。

* 数据处理：创建一个Schema，提供Schema的数据验证功能。
* 对象的转换：这些对象是指开发过程中创建的对象和MongodDB中代表的相应对象。

如果不明白，或者似懂非懂，如果看了下文，相信你会明白不少。

## 常用的术语

> Collections

Mongo中的`Collections`相当于关系数据库中的表（tables），它包含了大量的JSON文档（document）。

> Documents

`Documents`相当于SQL中的`记录`（records）或者`行`（rows）。在SQL中需要用多个表，通过数据间的引用来表达数据间的关联，但是在Mongo中可以通过一个`Document`来实现。

![NoSQL的Documents VS SQL 中的关联Tables](https://cdn-images-1.medium.com/max/600/0*rcotALFe2LeebN_y.)

> Schema

SQL定义一个`schema`通过表（table）的定义，而MongoDB中是没有这个的，如果我们使用MongoDB直接插入的就是一个`document`。mongoose它定义了一个`schema`来表示`document` 的数据结构或者构造函数，它是建立在应用层面上的，每个docuemnt都是它的示例对象。

> Fields

`Fields` 或者称之为属性，它相当于SQL中的`列`（columns），它用来形成一个个`schema`。

> Models

和`Schema`一样它也是一个数据结构或者构造函数，不过它更特殊。它使用`schema`创建了一个`Document`的实例，这个实例相当于SQL中的`记录`（record）。

## mongoose中的 Schema 和 Model

mongoose中的`schema`是`document`的构造函数，使用它可以定义一个`document`的默认值，进行字段（fields）的验证。

mongoose中的`model`提供了一个访问数据的接口，通过它可以实现对`document`(也可以叫做记录)的CRUD（增，查，改，删）。

所以，可以这么说`model`是`Schema`的包装器，通过包装实现了`Schema`结构的数据与MongoDB数据库之间的交互。

注：在开发过程中，使用的都是`Model`和`Schema`的实例，所以可以理解文章开篇说的`对象转换`和`对象数据模型`。具体可参考下面的示例代码。

### 引用mongoose

使用前需要先安装`mongooe`，可通过`yarn install mongoose`来安装，然后通过如下代码来引用：

```
// 引用mongoose
let mongoose = require('mongoose')
```

说明：`Schema`和`Model`不是显式的连接到了数据库，为什么这么说呢，因为开发的过程中，不是使用的`mongoose.connect("mongodb://127.0.0.1:27017")`返回的对象创建的`Schema`和`Model`，而是直接使用的`mongoose`的引用，这样做的好处很明显，极大地提升了性能。

mongoose定义使用了单例设计模式，所以使用`require`返回了一个单例对象，这在开发中比较常见，对于写自己的库有指导意义。

### 连接到MongoDB数据库

```
// 引用mongoose
let mongoose = require('mongoose')
// 连接到demo测试数据库
mongoose.connect('mongodb://127.0.0.1:27017/demo')
```

### 定义一个Schema

每一个`collection`中的所有`document`都使用同一个`Schema`定义的`field`。每一个`document`对象的键名通过`Schema`来定义。

```
// 引用mongoose
let mongoose = require('mongoose')
// 连接到demo测试数据库
mongoose.connect('mongodb://127.0.0.1:27017/demo')
// 定义并实例化一个Schema
let userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String
})
```

同样在`Schema`中可以对`field`进行验证，如：`firstname`是`String`类型的。

`Schema`的字段值可以是Array，String，Boolean，Buffer，Date，Number，ObjectId，或者Mixed(泛型，或者一个可变化的数据类型)。

## 定义并实例化一个model

```
// 引用mongoose
let mongoose = require('mongoose')
// 连接到demo测试数据库
mongoose.connect('mongodb://127.0.0.1:27017/demo')
// 定义并实例化一个Schema
let userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String
})
// 定义一个Model
let UserModel = mongoose.model('User', userSchema)
// 实例化一个Model
let person = new Usermodel({
  firstname: '东坡',
  lastname: '苏'
})
```

可能有的人会比较疑惑，为什么Schema的定义和实例化可以放在一起，而Model的定义和实例化要分开？因为`schema`的实例不牵涉到具体的操作，而`Model`的实例往往牵涉到复杂的操作。所以前者在开发中往往两个步骤一起来做，后者分开来做。

## mongoose的CRUD

### 添加数据

```
person
  .save()
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })
```

### 查看数据

```
userModel
  .find({
    lastname: '苏'   // query
  })
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })
```

### 更新数据

```
userModel
  .findOneAndUpdate(
    {
      lasttname: '苏'  // query
    }, 
    {
      firstname: 'xxx'   // field:values 的更新
    },
    {
      new: true,                       // 返回更新后的document
      runValidators: true              // 在更新前进行验证
    })
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })
```

### 删除数据

```
userModel
  .findOneAndRemove({
    firstname: '东坡'
  })
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.error(err)
  })
```

当然，mongoose还提供了很多很实用的api，这里就不多说了。[mongoose queries](https://mongoosejs.com/docs/queries.html)

