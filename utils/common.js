const dbService = require('./dbService');
/*
 * uniqueValidation: validate Login With Fields while Registration
 * @param Model : Mongoose Model, on which query runs
 * @param data : data , coming from request
 */
const uniqueValidation = async (Model, data) => {
	let filter = {};
	if (data && data['email']) {
		filter = {
			'email': data['email']
		};
	}
	let found = await dbService.getDocumentByQuery(Model, filter);
	if (found) {
		return false;
	}
	return true;
};


module.exports = {
	uniqueValidation
};
