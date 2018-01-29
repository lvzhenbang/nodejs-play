### 请求体

body-parser，formidable

bordy-parser 不支持multi-part

formidable 中if...else 错误

### session 和 cookie

express 4.x 以后将session和Cooke完全分离了出来，我们用cookie要引入cooke-parser, 用session要引入express-session。

通过option来设置session存储，除了session ID外，session中的任何数据都不存储在cookie中。
options可选参数:

1. name - cookie的名字（原属性名为 key）。（默认：’connect.sid’）
2. store - session存储实例
3. secret - 用它来对session cookie签名，防止篡改
4. cookie - session cookie设置 （默认：{ path: ‘/‘, httpOnly: true,secure: false, maxAge: null }）
5. genid - 生成新session ID的函数 （默认使用uid2库）
6. rolling - 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
7. resave - 强制保存session即使它并没有变化 （默认： true）
8. proxy - 当设置了secure cookies（通过”x-forwarded-proto” header ）时信任反向代理。当设定为true时，
”x-forwarded-proto” header 将被使用。当设定为false时，所有headers将被忽略。当该属性没有被设定时，将使用Express的trust proxy。
9. saveUninitialized - 强制将未初始化的session存储。当新建了一个session且未设定属性或值时，它就处于
未初始化状态。在设定一个cookie前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。（默认：true）
10. unset - 控制req.session是否取消（例如通过 delete，或者将它的值设置为null）。这可以使session保持存储
状态但忽略修改或删除的请求（默认：keep）

express-session的一些方法:

1. Session.destroy():删除session，当检测到客户端关闭时调用。
2. Session.reload():当session有修改时，刷新session。
3. Session.regenerate()：将已有session初始化。
4. Session.save()：保存session。


一旦我们将express-session中间件用use挂载后，我们可以很方便的通过req参数来存储和访问session对象的数据。req.session是一个JSON格式的JavaScript对象，我们可以在使用的过程中随意的增加成员，这些成员会自动的被保存到option参数指定的地方，默认即为内存中去


