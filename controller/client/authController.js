const authService = require('../../services/auth');
const User = require('../../model/user');
const dbService = require('../../utils/dbService');
const userTokens = require('../../model/userTokens');
const { uniqueValidation } = require('../../utils/common');
const { JWT } = require('../../constants/authConstant');

module.exports = {

	register: async (req, res) => {
		try {
			const data = new User({ ...req.body });
			let unique = await uniqueValidation(User, { email: req.body.email });
			if (!unique) {
				return res.inValidParam('Sorry! An account with that email already exists. Please try again or login to your account. ');
			}
			const result = await dbService.createDocument(User, data);
			return res.ok(result);
		} catch (error) {
			console.error(error);
			if (error.name === 'ValidationError') {
				return res.validationError(error.message);
			}
			if (error.code && error.code == 11000) {
				return res.isDuplicate(error.message);
			}
			return res.failureResponse(error.message);
		}
	},

	login: async (req, res) => {
		const params = req.body;
		try {
			if (!params.username || !params.password) {
				return res.insufficientParameters();
			}
			let result = await authService.loginWithOTP(params.username, params.password);
			if (!result.flag) {
				return res.loginSuccess(result.data);
			}
			return res.loginFailed(result.data);
		} catch (error) {
			console.error(error);
			return res.failureResponse(error.message);
		}
	},

	logout: async (req, res) => {
		try {
			let userToken = await dbService.getDocumentByQuery(userTokens, { token: (req.body.token).replace('Bearer ', '') });
			if (!userToken) {
				return res.badRequest({});
			}
			await dbService.findOneAndDeleteDocument(userTokens, { _id: userToken.id });
			return res.requestValidated('Logged Out Successfully');
		} catch (error) {
			console.error(error);
			return res.failureResponse(error.message);
		}
	},
};
