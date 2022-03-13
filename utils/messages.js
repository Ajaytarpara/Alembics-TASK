const responseCode = require('./responseCode');
const _ = require('lodash');

exports.successResponse = (data, res) => res.status(responseCode.success).json({
	status: 'SUCCESS',
	message: 'Your request is successfully executed',
	data,
});

exports.failureResponse = (data, res) => res.status(responseCode.internalServerError).json({
	status: 'FAILURE',
	message: data ? data : 'Internal Server Error',
	data: {},
});

exports.badRequest = (data, res) => res.status(responseCode.badRequest).json({
	status: 'BAD_REQUEST',
	message: 'The request cannot be fulfilled due to bad syntax',
	data,
});

exports.validationError = (data, res) => res.status(responseCode.validationError).json({
	status: 'VALIDATION_ERROR',
	message: `Invalid Data, Validation Failed at ${data}`,
	data,
});

exports.isDuplicate = (data, res) => res.status(responseCode.validationError).json({
	status: 'VALIDATION_ERROR',
	message: 'Data Duplication Found',
	data: {},
});

exports.recordNotFound = (data, res) => res.status(responseCode.notFound).json({
	status: 'RECORD_NOT_FOUND',
	message: !_.isObject(data) ? data : 'Record not found with specified criteria.',
	data: _.isObject(data) ? data : 'Record not found with specified criteria.',
});

exports.insufficientParameters = (res) => res.status(responseCode.badRequest).json({
	status: 'BAD_REQUEST',
	message: 'Insufficient parameters',
	data: {},
});

exports.inValidParam = (err, res) => res.status(responseCode.validationError).json({
	status: 'VALIDATION_ERROR',
	message: err,
	data: `Invalid values in parameters,${err}`,
});

exports.unAuthorizedRequest = (data, res) => res.status(responseCode.unAuthorizedRequest).json({
	status: 'UNAUTHORIZED',
	message: _.isString(data) ? data : 'You are not authorized to access the request',
	data,
});

exports.loginSuccess = (data, res) => res.status(responseCode.success).json({
	status: 'SUCCESS',
	message: 'Login Successful',
	data,
});
exports.loginFailed = (data, res) => res.status(responseCode.badRequest).json({
	status: 'BAD_REQUEST',
	message: data,
	data: 'Login Failed.',
});
exports.requestValidated = (data, res) => res.status(responseCode.success).json({
	status: 'SUCCESS',
	message: _.isObject(data) ? 'Your request is successfully executed' : data,
	data,
});
exports.invalidRequest = (data, res) => res.status(responseCode.success).json({
	status: 'FAILURE',
	message: _.isObject(data) ? 'Invalid request' : data,
	data,
});
exports.successWithNullMessage = (data, res) => res.status(responseCode.success).json({
	status: 'SUCCESS',
	message: '',
	data,
});
exports.successMessage = (msg, data, res) => res.status(responseCode.success).json({
	status: 'SUCCESS',
	message: msg,
	data,
});
exports.validationErrorMessage = (msg, data, res) => res.status(responseCode.validationError).json({
	status: 'VALIDATION_ERROR',
	message: msg,
	data: data,
});