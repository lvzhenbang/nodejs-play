var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
	res.render('about', {
		about: 'this is about page.'
	})
});

module.exports = router;