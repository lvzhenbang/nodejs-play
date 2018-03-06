var userModel = require('../models/user');

var formidable = require('formidable');

var eventProxy = require('eventProxy');

function getAllUser(req, res) {
    userModel.find().exec(function(err, data) {
        res.render('user', { title: 'user', user: data });
    });
}

function signin(req, res, next) {
    //formidable
    /*var form = new formidable.IncomingForm();
    form.parse(req, function(err, fileds) {

        var name = fileds.login_name,
            password = fileds.login_password;
        userModel.findOne({name: name})
        .exec()
        .then(function(user) {
            console.log(req.body)
            if (!user) {
               return res.render('signin', {msg: '用户名不存在'});
            }

            if (password !== user.password) {
               return res.render('signin', {msg: '密码错误'});
            }

            res.render('signin', {msg: '登录成功'});
        })
    })*/
    // body-parser
    /*var name = req.body.login_name,
        password = req.body.login_password;

    userModel.findOne({name: name})
        .exec()
        .then(function(user) {
            console.log(req.body)
            if (!user) {
               return res.render('signin', {msg: '用户名不存在'});
            }

            if (password !== user.password) {
               return res.render('signin', {msg: '密码错误'});
            }

            res.render('signin', {msg: '登录成功'});
        })*/
    // 使用事件代理
    var name = req.body.login_name,
        password = req.body.login_password;
    var ep = new eventProxy();

    ep.fail(next);
    ep.on('signin_info', function(msg) {
        res.render('signin', {
            msg: msg,
            name: name
        });
    });

    if(name.length < 3) {
        return ep.emit('signin_info', '用户名不能少于3个字符')
    }

    userModel.findOne({name: name})
        .exec()
        .then(function(user) {
            if (!user) {
               return ep.emit('signin_info', '用户名不存在');
            }

            if (user.password !== password) {                
               return ep.emit('signin_info', '密码错误');
            }

            return ep.emit('signin_info', '登录成功');
        })
}

function signup(req, res, next) {
	// var form = new formidable.IncomingForm();
    var ep = new eventProxy();
	// form.parse(req, function(err, fileds) {
		var name = req.body.reg_name,
            password = req.body.reg_password,
            rePassword = req.body.reg_re_password,
            email = req.body.reg_email;

        ep.fail(next);
        ep.on('signup_info', function(msg) {
            res.render('signup', {
                msg: msg,
                name: name,
                email: email
            });
        });

        if(name.length < 3) {
            return ep.emit('signup_info', '用户名不能少于3个字符');
        }
        
        if(password.length < 6){
            return ep.emit('signup_info', '密码不能少于6个字符');
        }
        
        if(!/^(?=.*[a-zA-Z])(?=.*[0-9])/g.test(password)) {
            return ep.emit('signup_info', '密码要包含数字和字符');
        }
            
        if(password !== rePassword) {
            return ep.emit('signup_info', '两次密码不一致');
        }

        if(email.indexOf('@') !== -1) {
            return ep.emit('signup_info', '邮箱格式不正确');
        }

        userModel.findOne({name: name})
            .exec()
            .then(function(user) {
                if(user) {
                    return ep.emit('signup_info', '用户名或邮箱已存在');                     
                } else {
                    var user = {
                        name: name,
                        password: password,
                        email: email
                    };
                    userModel.create(user).then(function(result) {
                        return ep.emit('signup_info', '注册成功');
                    }).catch(function(e){
                        return ep.emit('signup_info', '注册失败');
                    });
                }
            })
            .catch(function(err) {
                res.send({error: err})
            })

		/*userModel.findOne({name: name})
            .exec()
            .then(function(user) {
                if(user) {
                    res.render('signup', {msg: '用户名已存在'});                     
                } else {
                    if( !password || password !== rePassword) {
                        res.render('signup', {msg: '密码错误'});
                    } else {
                        var user = {
                            name: name,
                            password: password,
                            email: email
                        };
                        userModel.create(user).then(function(result) {
                            res.render('signup', {msg: '注册成功'});
                        }).catch(function(e){
                            res.render('signup', {msg: '注册失败'});
                        });
                    }
                }
            })
            .catch(function(err) {
                res.send({error: err})
            })*/
	// })
}

module.exports = {
    getUser: getAllUser,
    signin: signin,
    signup: signup
};