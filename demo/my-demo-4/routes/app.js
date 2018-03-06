var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', {
        fruits: ['apple', 'orange']
    })
});

module.exports = router;