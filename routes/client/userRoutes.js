const express = require('express');
const router = express.Router();
const userController = require('../../controller/client/userController');
const auth = require('../../middleware/auth');

router.route('/client/api/v1/user/win_of_the_day').get(auth(), userController.winOfTheDay);
router.route('/client/api/v1/user/earning_history_usd').get(auth(), userController.earningHistoryInUsd);
router.route('/client/api/v1/user/account_earning_status').get(auth(), userController.accountEarningStats);

module.exports = router;
