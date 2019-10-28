# mongo 文档

## 数据库安装(for widows)

[` for windows `](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

* 设置环境变量
* 设置执行目录
* 设置备份目录
* 启动mongodb服务（net start mongodb）

## 数据库备份

```
mongodump
```

注：默认保存在`./dump`目录下

[` doc `](https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools/)

## 数据库恢复

```
mongorestore
```

注：需要指定备份的目录

[` doc `](https://docs.mongodb.com/manual/reference/program/mongorestore/)

## 导出集合

* 需要指定数据库和集合名字
* 需要指定数据的文件目录和文件名

```
mongorestore --db=demo --collection=users --out=d:/data/backup/demo.json
```