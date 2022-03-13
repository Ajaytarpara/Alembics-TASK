const express = require('express');
const routes = express.Router();
const authController = require('../../controller/client/authController');

routes.route('/client/auth/register').post(authController.register);
routes.route('/client/auth/login').post(authController.login);
routes.route('/client/auth/logout').post(authController.logout);

module.exports = routes;