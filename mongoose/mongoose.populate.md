# collection关联

参考[` mongoose.populate `](https://mongoosejs.com/docs/populate.html#population)

## 示例

### 结构

collection-user结构如下：

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String,
});

const User = mongoose.model('User', userSchema);
```

collection-articles结构如下：

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  body: String,
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Article = mongoose.model('Article', articleSchema);
```

注：` articleShcema `中的` user `字段使用了` 关联 `（类关系数据库中的join）。其中` type `指定数据类型，其中` ref `指定关联的` collection-user `model` User `。

### 获取关联表中的数据

` model.populate(path, select, ...) `方法

注：其中` path `为model的结构schema中的指定字段，结合上文的示例即为` articelSchema `中的` user `字段；` select `为关联的` userSchema `中的某一个或多个字段，结构为`name password`。

注：如果不使用` model.populate() `，则不会显示关联的collection中的字段。

示例代码如下：

```
Article.
  .find({})
  populate('user', 'name password')
  .exec((err, article) => {
    if (err) console.log(err);
    // console.log(article);
  })
```
