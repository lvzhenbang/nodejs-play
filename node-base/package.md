### 包（package）

在我们的nodejs项目中一共有两种包一种是本地自定义的包，一种是使用npm管理器下载的第三方包。

它们的引用方式相同，如下：

	require('[包名]');

区别是第三方包只需要输入包名即可，本地包需要输入包名和它的相对路径。

#### 本地包

比如在一个web开发项目中，我们会将项目的所有模块按类进行分组，然后指定分组的入口模块即可。别的模块想要引用该分组只需要，访问该入口模块即可，该入口模块负责对该分组的其它模块进行引用，然后进行相关处理。

下面是一个我们经常见的项目列表：

```
.
  ├── README.md   		 // 项目描述
  ├── index.html       // 项目入口文件
  ├── main.js 				 // 模块入口文件
  ├── package.json     // 项目配置文件
  ├── src
  │   ├── common       // 公用的模块
  │   ├── assets       // 公用的js和css文件
  │	  ├── index        // 首页模块包
  │   ├── aboutus      // 关于我们模块包
  ......
````

当然后面我们还可以定义更多的模块包。

在创建一个nodejs项目，我们会先用初始化我们的项目，命令如下：

	npm init

执行这个命令会生成一个 `package.json` 的文件，这里包含我们的项目的配置信息和所以来的第三方包。

可配置的项包括如下：

```
name 名称
应用描述 description
版本号 version
应用的配置项 config
作者 author
资源仓库地址 respository
授权方式 licenses
目录 directories
应用入口文件 main
命令行文件 bin
项目应用运行依赖模块 dependencies
项目应用开发环境依赖 devDependencies
运行引擎 engines
脚本 script
```

本地包的目录结构如下：

```
.
  ├── index
  │   ├── moduleA.js    // 模块A
  │   ├── moduleB.js    // 模块B
  │   ├── index.js      // 入口模块
```

入口模块我们一般定义为 `index.js` 这样我们引用的时候只需要报的名字 `index` 即可，否则就需要输入完整的路径。

#### 包管理器（NPM）

npm是NodeJS的包管理工具，它会随同NodeJS一起被安装，它有以下使用场景：

* 允许用户从NPM服务器下载别人编写的第三方包到本地使用
* 允许用户从NPM服务器下载别人编写的命令行程序到本地使用
* 允许用户将自己编写的包或命令行程序上传到NPM服务器供他人使用

下载第三方包，我们只需要在 `npm install` 后跟第三方包的名字即可，如果要使用指定版本的话，就需要在版本名字后跟上一个 `@` 符号，然后紧跟着加上版本号即可。如：要下载 `argv` 包，版本号为0.01，可输入 `npm install argv@0.0.1` 这样的命令。

格式如下：

	npm install [package]@<version>

安装后的第三方包，将会出现在 `package.json` 配置模块中，这样 nodejs 在运行时才能执行相应的命令。

我们的项目有两两个阶段，即是开发阶段和发布阶段，由于开发和发布是两个不同的环境，开发中需要的包发布的时候就不一定需要，反之也是。

发阶段往往比发布阶段需要更多的调试相关的包。

所以，正对不同的情况我们使用不同的命令进行包的安装，这里需要的是增加命令参数开发阶段为 `--save-dev` ，为发布阶段使用的加参数 `--save` 。

常用npm命令：

```
npm install [package]@<version> // 下载相关版本的包
npm update [package] // 更新下载的包
npm publish [package]@<version>	// 发布相关版本的包
npm unpublish [package]@<version> // 清除发布的相关版本的包
npm cache clear // 清空NPM本地缓存
```