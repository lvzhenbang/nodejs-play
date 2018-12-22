# mongoose再认识（三）

今天，说一个常见的知识点插件。对于不熟悉mongoose的人可能会问mongoose中也有插件？这个别说还真的有。

那么，在mongoose中的插件如何使用？

## mongoose插件的使用

它和通常用的JavaScript的插件一样，都是为了实现代码的重用。

同[mongoose再认识（二）](https://github.com/lvzhenbang/nodejs-play/blob/master/mongoose/mongoose-helpers.md)中介绍的方法类似。可以在`Schema`的实例上添加。

首先，介绍一个api `schema.add()`，这个方法可以实现对`Schema`的扩充。

那么，可以紧接着[mongoose再认识（二）](https://github.com/lvzhenbang/nodejs-play/blob/master/mongoose/mongoose-helpers.md)中的代码来说，修改它的代码如下：

```
let UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String
})

UserSchema.add({
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save', function(next) {
  let now = Date.now()
  this.updateAt = now;

  if (!this.createAt) this.createAt = now;
})
```

将`createAt`和`updateAt`的代码提取出来，因为在开发中，很多`collection`都需要它们，同样也可能需要用到它的处理方法。所以，用一个插件将它们封装起来变得很有必要。可参考如下代码：

```
module.exports = function(schema) {
  schema.add({
    createAt: {
      type: Date,
      default: Date.now
    },
    updateAt: {
      type: Date,
      default: Date.now
    }
  })

  schema.pre('save', function(next) {
    let now = Date.now()
    this.updateAt = now;

    if (!this.createAt) this.createAt = now;
  })
}
```
文件名为`time-plugin.js`

然后，在使用它的`UserSchema`定义中引用它。代码如下：

```
let UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String
})

let timePlugin = require('../plugins/time-plugin.js)

userSchema.plugin(timePlugin)
```

在[cnode-club](https://github.com/cnodejs/nodeclub/tree/master/models)的源码中定义了一个`base_model.js`文件，这个文件分别在`topic.js` 、 `user.js`等文件中进行了引用。

