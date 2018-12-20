## mongodb

mongodb 这个名词我以前也只是听说，不过随着nodejs越来越火，这个东西也被人们挂在口头，我有兴趣也对它进行了深入学习。

mongodb 令人印象深刻就是它所提出的文档型这个概念。

mongodb 是对象文档映射（Object Document Mapping）。

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
