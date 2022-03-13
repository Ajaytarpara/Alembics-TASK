const jwt = require('jsonwebtoken');
const clientSecret = require('../constants/authConstant').JWT.CLIENT_SECRET;
/*
 * policy : authentication policy to check, 
 *          whether user is authenticated or not
 */
const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(' ')[1];
		let url = req.originalUrl;
		let secret = '';
		if (url.includes('client')) {
			secret = clientSecret;
		}
		if (url.includes('admin')) {
			secret = adminSecret;
		}
		jwt.verify(token, secret, (err, user) => {
			if (err) {
				return res.unAuthorizedRequest(err);
			}
			req.user = user;
			next();
		});
	} else {
		return res.unAuthorizedRequest({});
	}
};
module.exports = authenticateJWT;