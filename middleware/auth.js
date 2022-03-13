const passport = require('passport');

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
	if (err || info || !user) {
		if (info && info.name == 'TokenExpiredError') {
			return reject('Your session token has expired. Please login again.');
		}
		return reject(err || info);
	}
	req.user = user;
	if (!user) {
		return reject('User not found');
	}
	if (!user.isActive) {
		return reject('User is deactivated');
	}
	resolve();
};

/*
 * policy : authentication & authorization policy for platform wise check, 
 *          whether user is authenticated and authorized or not
 */
const auth = () => async (req, res, next) => {
	return new Promise((resolve, reject) => {
		passport.authenticate('client-rule', { session: false }, verifyCallback(req, resolve, reject))(
			req,
			res,
			next
		);
	})
		.then(() => next())
		.catch((err) => {
			return res.unAuthorizedRequest(err);
		});

};

module.exports = auth;
