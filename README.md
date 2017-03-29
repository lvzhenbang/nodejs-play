# lvzhenbang.io

> blog

# 使用的vue知识点

> vue-resource vue-router vue-infinity-scroll vue-transition

> demo演示地址： <a href="https://lvzhenbang.github.io/lvzhenbang.io/">https://lvzhenbang.github.io/lvzhenbang.io</a>

# 存在问题
## 使用 npm run build 命令打包该项目路径存在一定的问题，如静态资源加载
 1.css 中引入的图片问题
 2.static中的伪数据 about-me.json引入问题， life.json引入问题

### 提示： 使用vue模板开发的项目使用npm run build 命令打包项目 ， 点击 打包文件夹dist/index.html,访问出错，需修改、config/index.js配置文件中的 build 配置对象 中assetsPublicPath: '/'为assetsPublicPath: './'

> 作为一个vue.js的初学者能够借鉴各位前辈的经验，做出这个blog我很感谢大家。
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
