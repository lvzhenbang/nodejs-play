## 快速搭建一个使用express 的demo

1. 创建一个文件夹，使用npm初始化项目，这跟 `vue init webpack [项目名]` 类似，准确说是vue项目初始化就是这样来的。

```
mkdir my-demo // 创建一个文件夹

cd my-demo // 切换到该文件夹

npm init // 初始化该文件所代表的项目，这里你只需要按照提示命令输入即可

npm install --save-dev express // 安装express
```

2.修改 `package.json` 文件的 `scripts` 配置项

```
{
  "name": "my-demo",
  "version": "1.0.0",
  "description": "express init",
  "main": "main.js", // 项目入口文件
  "scripts": {
    "dev": "node main.js", // 修改启动命令
    "supervisor": "supervisor main.js"
  },
  "keywords": [
    "epxress"
  ],
  "author": "lvzhenbang",
  "license": "MIT",
  "devDependencies": {
    "express": "^4.16.2"
  }
}

```

3.在shell（也就是我们经常使用的命令行）中输入如下命令

	npm run dev

这样我们的epxress demo 就启动了，是不是就很符合我们使用vue和react等项目的习惯。

有的同学可能比较喜欢热交换，也就是项目在浏览器中自动打开，修改保存后浏览器自动实现刷新。

当然我们可以使用webpack + webpack-dev-server + webpack.HotModuleRepalcementPlugin + autoOpenBrowser这样的配置，如果想深入了解的可以参考一下[自定义实现webpack-dev-server](https://github.com/lvzhenbang/webpack-play/blob/master/doc/first/custom-HMR.md)

补充：

在我们学习express，为了避免重复的启动express，我们可以使用 `supervisor` 来监控epxress的进程

supervisor 安装命令如下：

	npm install -g supervisor

这里的supervisor是node插件是用来监控node进程的，所以不像我们常使用的用 `npm install --save-dev [package]` 或  `npm install --save [package]` 这样安装第三方引用。

为了统一使用命令，`package.json` 文件修改如下：

```
"scripts": {
    "dev": "node main.js", // 修改启动命令
    "supervisor": "supervisor --harmony main.js" // 监控入口文件
  },
```

详细了解supervisor请参考[https://github.com/petruisfan/node-supervisor](https://github.com/petruisfan/node-supervisor)


[项目源代码](https://github.com/lvzhenbang/nodejs-play/blob/master/demo/my-demo)
