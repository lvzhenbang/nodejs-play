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

## 为指定数据库闯将用户（for windows）

* 在`./bin/mongod.cfg `中，找到` security `，然后参考[` mongo doc `](https://docs.mongodb.com/manual/core/security-internal-authentication/)配置`./bin/mongod.cfg `；然后，用[` db.createUser `](https://docs.mongodb.com/manual/reference/method/db.createUser/)方法创建。

`mongod.cfg`示例如下：

```
...
# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1


#processManagement:

security:
  authorization: enabled

#operationProfiling:
...
```

shell代码为名字是` test `数据库创建用户，用户名为` testUser256 `。

```
use test
db.createUser({
  user: "testUser256",
  pwd: passwordPrompt(),
  roles: [ { role: "readWrite", db: "test" } ],
  mechanisms: [ "SCRAM-SHA-256" ]
})
```

注：未配置` security.authorization `新创建的用户不起作用。

注：db.dropAllUsers( {w: "majority", wtimeout: 5000} )