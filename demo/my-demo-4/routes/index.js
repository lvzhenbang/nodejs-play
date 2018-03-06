module.exports = function (app) {

	var appRouter = require('./app');

	var aboutRouter = require('./about');

	var userRouter = require('./user');

	app.use('/', appRouter);
	app.use('/about', aboutRouter);
	app.use('/', userRouter);

	// 404
	app.use(function(req, res) {
		if(!res.headersSent) {
			res.status(404).render('404')
		}
	});
}