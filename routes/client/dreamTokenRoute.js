const express = require('express');
const router = express.Router();
const dreamTokenController = require('../../controller/client/dreamTokenController');
const auth = require('../../middleware/auth');

router.route('/client/api/v1/token/create').post(auth(), dreamTokenController.createTokenEntry);

module.exports = router;
