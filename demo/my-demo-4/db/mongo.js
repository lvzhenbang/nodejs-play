var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my-user');

var db = mongoose.connection;

db.once('open', function() {
	console.log('连接数据库成功.');
});

db.on('err', function(error) {
	console.error('连接数据库失败.' + error);
	mongoose.disconnect();
});

db.on('close',  function() {
	console.log('数据库断开，重新连接数据库.');
	mongoose.connect('mogodb://127.0.0.1/my-user');
});

module.exports = db;