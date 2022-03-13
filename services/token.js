
const jwt = require('jsonwebtoken');
const { JWT } = require('../constants/authConstant');
const User = require('../model/user');
const userTokens = require('../model/userTokens');
const dbService = require('../utils/dbService');
const moment = require('moment');

const generateAuthTokens = async (user, secret = JWT.CLIENT_SECRET) => {
	const accessTokenExpires = moment().add(60, 'minutes');
	const accessToken = generateToken({ userId: user._id }, accessTokenExpires, secret);

	const refreshTokenExpires = moment().add(120, 'minutes');
	const refreshToken = generateToken({ userId: user._id }, refreshTokenExpires, secret);
	await saveToken(refreshToken, user.id, refreshTokenExpires);
	return {
		access: {
			token: accessToken,
			expires: accessTokenExpires.toDate(),
		},
		refresh: {
			token: refreshToken,
			expires: refreshTokenExpires.toDate(),
		},
	};
};

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (data, expires, secret) => {
	const payload = {
		iat: moment().unix(),
		exp: expires.unix(),
		data,
	};
	return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires) => {
	return userTokens.create({
		token,
		userId,
		tokenExpiredTime: expires.toDate(),
	});
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, secret) => {
	const payload = jwt.verify(token, secret);
	const tokenDoc = await dbService.getDocumentByQuery(userTokens, {
		token,
		userId: payload.data.userId
	});
	if (!tokenDoc) {
		throw new Error('Token not found');
	}
	return tokenDoc;
};

module.exports = {
	verifyToken,
	generateToken,
	generateAuthTokens
};