/*
 * client authentication - with passport
 */

const {
	Strategy, ExtractJwt
} = require('passport-jwt');
const { JWT } = require('../constants/authConstant');
const User = require('../model/user');

module.exports = {
	clientPassportStrategy: passport => {
		const options = {};
		options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
		options.secretOrKey = JWT.CLIENT_SECRET;
		passport.use('client-rule',
			new Strategy(options, (payload, done) => {
				User.findOne({ _id: payload.data.userId }, (err, user) => {
					if (err) {
						return done(err, false);
					}
					if (user) {
						return done(null, { ...user.toJSON() });
					}
					return done('No User Found', {});
				});
			})
		);
	}
};