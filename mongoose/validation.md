## validation

* validation 是被定义的 Schema 类型
* validation 是middleware。在每个Schema中mongoose注册validation为 pre('save') 钩子
* 可以用 doc.validate(callback) 或 doc.validateSync() 使用 validation
* validator 不运行在值为 undefined 上，仅作用在还有required字段上
* validation 是异步递归；当我们使用model的save方法字document将会被执行validation，如果出现错误，model的sae方法的回调函数将会接收到
* validation 可自定义