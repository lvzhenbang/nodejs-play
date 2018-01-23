var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', {
		title: 'index',
		fruits: ['apple', 'orange', 'banana']
	})
});

module.exports = router;