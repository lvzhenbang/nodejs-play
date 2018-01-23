var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
	res.render('about', {
		title: 'index',
		about: 'this is about page.'
	})
});

module.exports = router;