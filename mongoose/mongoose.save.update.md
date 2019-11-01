# save vs update vs findOneAndUpdate

## usage

### save

* [` model.prototype.save() `](https://mongoosejs.com/docs/api/model.html#model_Model-save)

### update

* [` model.prototype.update() `](https://mongoosejs.com/docs/api/model.html#model_Model-update)
* [` model.prototype.updateMany() `](https://mongoosejs.com/docs/api/model.html#model_Model.updateMany)
* [` query.prototype.update() `](https://mongoosejs.com/docs/api/query.html#query_Query-update)
* [` query.prototype.updateMany() `](https://mongoosejs.com/docs/api/query.html#query_Query-updateMany)

### findOneAndUpdate

* [` model.prototype.findOneAndUpdate `](https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate)
* [` query.prototype.findOneAndUpdate `](https://mongoosejs.com/docs/api/query.html#query_Query-findOneAndUpdate)

注：[` findByIdAndUpdate `](https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate)调用的是` findOneAndUpdate `，所以这里就不详细说明。

## save vs update/findOneAndUpdate

### model.prototype.save()/query.prototype.save()

当集合（collection）中存在一个文档（document）时，就更新该文档数据；反之，当集合中没有这样一个文档（document）时，就是单纯的向（collection）中插入一个（document）。

### model.prototype.update()/query.prototype.update()

单纯的就是更新集合（collection）中对应的文档（document）。

## update vs findOneAndUpdate

### model.prototype.update()/query.prototype.findOneAndUpdate()

查找到集合（collection）中所有匹配到的文档（document），并更新他们，然后返回更新的文档（document）的数量。

### model.prototype.findOneAndUpdate()/query.prototype.findOneAndUpdate()

查找到集合（collection）中所匹配到的文档（document）中的第一条数据，并更新它，然后返回更新的文档（document）。