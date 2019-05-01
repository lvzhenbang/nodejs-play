# 文件系统（fs）

常用的两种，`createReadStream()`和`craeteWriteStream()`。

## 网络爬虫（createWriteStream）

首先，引入`request`和`async`模块：

```
yarn add request async --dev
```

注：`request`主要用于http请求的；`async`主要用于异步操作。

其次，使用`nodejs`提供的`fs`模块，进行文件操作；

```
var fs = require('fs');
```

然后，定义一个`download`方法：

```
var fs = require('fs');
var path = require('path');
var request = require('request');
var async = require('async')

var downloadImage = function(src, dest, callback) {
  request(
    { src },
    function(err, res, body) {
      if (err) {
        console.log('request: ' + err)
      } else {
        dest = path.join(__dirname, dest);
        var arr = dest.split(path.sep);
        for (var i=0; i<arr.length; i++) {
      
          var dir = path.join.apply(null, arr.slice(0, i));
          // dir stat
          fs.existsSync(dir) || fs.mkdirSync(dir)  
        }
        // download
        request(src)
          .pipe(fs.createWriteStream(dest))
          .on('close', function() {
            callback(null, dest);
          });
      }
    }
  );
};

var data = [
  "201097/17850/Xq5KZiBP.jpg",
  "201097/17850/5V0PDJAR.jpg",
  "201097/17850/1WGzEVaw.jpg",
  "201097/17850/9RDa94KR.jpg",
  "201097/17850/wSAM3FWk.jpg",
  "201097/17850/qi1ltEQZ.jpg",
  "201097/17850/pxZzwGMI.jpg",
]

var original = "https://pre.ih5.cn/v3/files/" || '';
async.map(data, function(item) {
  downloadImage(original + item, item, function(err, data) {
    if (err) {
      console.log('download: ' + err)
    } else {
      console.log('ok.')
    }
  })
})
```