var mongoose = require('mongoose');

var userData = require('../initData/user');

var userSchema = new mongoose.Schema({
    name : { type:String },
    password: { type: String, default: '123456' },
    email: { type:String, default: '' },
    age  : { type:Number, default: 18 },
    birthday : { type:Date, default: Date.now },
});

userSchema.index({id: 1})

var User = mongoose.model('User', userSchema);

User.findOne(function(err, data) {
	if(!data) {
		userData.forEach(function(item) {
			User.create(item);
		})
	}
})

module.exports = User;