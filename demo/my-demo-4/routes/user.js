var express = require('express');

var User = require('../controllers/user.js');

var router = express.Router();

router.get('/user', User.getUser);

router.get('/signin', function(req, res) {
	res.render('signin', { title: 'signin' });
});

router.post('/signin', User.signin);

router.get('/signup', function(req, res) {
	res.render('signup', { title: 'user' });
});

router.post('/signup', User.signup);

module.exports = router;