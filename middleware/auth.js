const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
	console.log('got here');
	const token = req.header('x-auth-token');
	if (!token) return res.status(401).json('Access denied. No token provided.');

	try {
		const decoded = jwt.verify(token, 'password');
		req.user = decoded;
		next();
	} catch (ex) {
		console.log(ex)
		console.log(token)
		res.status(400).json({ error: 'Invalid token.' });
	}
};
