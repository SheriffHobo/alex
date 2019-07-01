
module.exports = function(app) {
	console.log('CORS configured')
  app.use(function(req, res, next) {
	  res.header('Access-Control-Allow-Origin', '*');
	  // if (process.env.NODE_ENV === 'development') res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	  res.header('Access-Control-Max-Age', '3600')
	  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-auth-token');
	  
	  next();
	});
}