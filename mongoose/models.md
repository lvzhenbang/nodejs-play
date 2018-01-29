## models

models 是mongoose 下的一个对象，我们使用 mongoose.model() 可以创建一个models的实例Document，model()有两个参数，第一个对应数据库中的表名，第二个对应表的结构。如果数据库中没有该表，第一次使Document发送请求将会创建一个相对应的表。

mongoose.model 这个类拥有以下常用方法：

* 查询(query): find, findOne, findBy, where等
* 删除(remove): remove
* 更新(upadate): update

那么，它的实例话对象Document将继承这些方法。

### Document

作为models的实例，document和存储在mongodb中的相应表的数据是一一对应的映射关系。

models类的查询方法，DOcument实例都喝一使用。

我们可以通过修改Document，如：用set()方法修改document，然后通过save方法将数据保存在数据库中，我们也可以通过update方法更新数据库。

在mongodb中没有join，我们可以通过populate来实现两个不同的collection中的document拼接。

