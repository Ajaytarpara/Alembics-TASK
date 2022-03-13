const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var idValidator = require('mongoose-id-validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const { USER_ROLE } = require('../constants/authConstant');
const _ = require('lodash');
const myCustomLabels = {
	totalDocs: 'itemCount',
	docs: 'data',
	limit: 'perPage',
	page: 'currentPage',
	nextPage: 'next',
	prevPage: 'prev',
	totalPages: 'pageCount',
	pagingCounter: 'slNo',
	meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
	{
		password: {
			type: String,
			required: true,
			minLength: 8
		},

		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			uniqueCaseInsensitive: true
		},

		firstName: { type: String },

		isActive: { type: Boolean },

		createdAt: { type: Date },

		updatedAt: { type: Date },

		phoneNo: { type: String },

		lastName: { type: String },

		isDeleted: { type: Boolean },

	}
);
schema.pre('save', async function (next) {
	this.isDeleted = false;
	this.isActive = true;
	if (this.password) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next();
});

schema.pre('insertMany', async function (next, docs) {
	if (docs && docs.length) {
		for (let index of docs) {
			const element = docs[index];
			element.isDeleted = false;
			element.isActive = true;
		}
	}
	next();
});

schema.methods.isPasswordMatch = async function (password) {
	const userData = this;
	return bcrypt.compare(password, userData.password);
};
schema.method('toJSON', function () {
	const {
		__v, ...object
	} = this.toObject({ virtuals: true });
	object.id = object._id;
	object.firstName = _.capitalize(object.firstName);
	object.lastName = _.capitalize(object.lastName);

	return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

schema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' });

const user = mongoose.model('user', schema, 'user');
module.exports = user;