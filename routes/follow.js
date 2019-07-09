const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.put('/', auth, (req, resp) => {
	console.log(req.user, req.body);
});

module.exports = router;
