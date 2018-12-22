# mongoose再认识（二）

在开发中，除了使用mongoose进行一些基本的操作外，就是一些技巧的使用。

文章接续[mongoose再认识(一)](https://github.com/lvzhenbang/nodejs-play/blob/master/mongoose/mongoose-enforce-init.md)，下文中使用代码可参考这篇文章中的。

## 虚拟字段

虚拟字段，从字面意思就可以明白，它不是真正的字段，不存在与数据库中，但是当使用`model`实例查询时，却可以灵活的运用这个字段。

注：这个特性是mongoose自己的，与mongo无关。

```
...
// 添加了一个虚拟的fullname字段
// get fullname
UserSchema
  .virtual('fullname')
  .get(() => this.firstname + ' ' + this.lastname)
// set fullname
UserSchema
  .virtual('fullname')
  .set((name) => let arr = name.split(' '), this.firstname = arr[0], this.lastname = arr[1] )

// read
UserModel
  .find({})
  .exec()
  .then(doc => {
    console.log(doc[0])
  })
```

查询的结果如下：

```
{ _id: 5c1dc7248aaf9c2c80fee915,
  firstname: '东坡',
  lastname: '苏',
  __v: 0 }
```

那么，如何获取到结果`fullname`呢？

可以通过`doc[0].fullname`来获取。

如何对数据进行保存呢？代码如下：

```
// 模拟AJAX请求保存数据
let person2 = new UserModel()
person2.fullname = '白 李'

person2
  .save()
  .then(doc => console.log(doc))
  .catch(err => console.log(err))
```

返回结果：

```
{ _id: 5c1dd7ef535df51980e9fd98,
  firstname: '白',
  lastname: '李',
  __v: 0 }
```

这样，在开发的过程中，就不用担心因为字段不匹配而需要修改数据库的问题。这也是它存在的意义。

有兴趣的同学可参考[node club](https://github.com/cnodejs/nodeclub/blob/master/models/user.js)中对`user.js`中用户的分级，不需要在建立一个字段用来保存用户的等级，可以用`virtual Type`通过`socre`计算来得出来。

## 在Schema定义一些Model实例常用的方法

熟悉mongoose的原理的都知道，`Model`的构造函数是在`Schema`实例的基础上创造出来的。所以，对于频繁操作的`Model`实例方法，可以在`Schema`的实例上进行定义（具体的可参考JavaScript的prototype）。

在一个`Schema`中经常会带有`updateAt`和`createAt`这样的字段，通常的情况下，会给它们一个默认的值。`userSchema`代码修改如下：

```
let UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
})
```

在开发中，开发者往往不会手动的处理它们，但是对于跟踪记录一个数据来说又很必要，也不允许用对这些数据任意的修改。那么，应该如何操作它才是最好的呢？

当然，最好就是在执行`post`请求的时候，会有一些方法会根据一定机制自动保存。

而mongoose就存在这样的机制，可以在`Schema`的实例上添加`pre`的方法，代码如下：

```
UserSchema.pre('save', function(next) {
  let now = Date.now()
  this.updateAt = now;

  if (!this.createAt) this.createAt = now;
})
```

模拟AJAX请求保存数据：

```
let person3 = new UserModel()
person3.fullname = '甫 杜'

person3
  .save()
  .then(doc => console.log(doc))
  .catch(err => console.log(err))
```

返回结果：

```
{ _id: 5c1e006204bad42224374aea,
  createAt: 2018-12-22T09:14:10.862Z,
  updateAt: 2018-12-22T09:14:10.877Z,
  firstname: '甫',
  lastname: '杜',
  __v: 0 }
```

这个觉过并不能说明问题，它是`Schema`定义时和`pre`方法共同作用的结果。

尝试更新数据来验证定义的方法，代码如下：

```
UserModel.findOne({
  lastname: '杜'
})
.exec()
.then(function(doc) {
  doc.lastname = '杜'
  doc.firstname = '甫'

  doc.save()
  .then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)
  })
})
.catch(err => console.log(err))
```

返回结果：

```
{ _id: 5c1e006204bad42224374aea,
  createAt: 2018-12-22T09:14:10.862Z,
  updateAt: 2018-12-22T09:15:04.398Z,
  firstname: '牧',
  lastname: '杜',
  __v: 0 }
```


这里，我们使用save对数据进行更新，当然这对于跟踪用户的操作行为很有好处，但是并不是所有的数据都需要的，而对于哪些不需要的，还是可以考虑使用findOneAndUpdate，updae，updateMany的。

细心的同学会发现，其实它和shell命令的`db.users.insert({})`类似，`user.save({})`是插入一条数据，而后者则可以插入多条数据。

注：在使用操作数据库中的数据时一定要注意，要操作的时`user.find()`或`user.findOne()`返回的一整条数据，如果是实例化了一个`UserModel`，则会造成数据库中的数据丢失。
