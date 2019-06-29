const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const chatModel = require('../models/chat');
router.delete('/clear', async (req, resp) => {

    const result = await chatModel.remove();
    resp.json(result);

});

module.exports = router; 