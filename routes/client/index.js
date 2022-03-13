const express = require('express');
const router = express.Router();

router.use(require('./auth'));
router.use(require('./userRoutes'));
router.use(require('./dreamTokenRoute'));

module.exports = router;
