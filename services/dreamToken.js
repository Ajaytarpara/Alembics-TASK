const DreamToken = require('../model/dreamToken');
const moment = require('moment');

const getTokenWinInCurrentDay = async (userId) => {
	let records = await findRecordByTime(userId, moment().startOf('day'), moment().endOf('day'));
	let sum = 0;
	for (let i = 0; i < records.length; i++) {
		let obj = records[i].toJSON();
		sum = sum + parseFloat(obj.tokenAmount)
	}
	return sum;
};

const findRecordByTime = async (userId, startTime, EndTime) => {
	return DreamToken.find({
		user: userId,
		$and: [
			{ createdAt: { '$gt': startTime } },
			{ createdAt: { '$lt': EndTime } }
		]
	});
};

const dayWiseRecord = async (userId) => {
	return DreamToken.aggregate([
		{
			$match:
			{
				user: userId
			}
		},
		{
			$group: {
				"_id": {
					$add: [
						{ $dayOfYear: "$createdAt" },
						{
							$multiply:
								[400, { $year: "$createdAt" }]
						}
					]
				},
				first: { $min: "$createdAt" },
				count: { $sum: 1 },
				totalAmount: { "$sum": "$tokenInUsd" }
			},
		},
		{ $project: { date: "$first", totalAmount: 1, _id: 0 } }
	]);
};

const totalEarningInUsd = async (userId) => {
	return DreamToken.aggregate([
		{
			$match:
			{
				user: userId,
			}
		},
		{
			$group: {
				"_id": "$user",
				totalAmount: { "$sum": "$tokenAmount" }
			},
		}
	]);
};

const todayEarningHistory = async (userId) => {
	return DreamToken.aggregate([
		{
			"$project": {
				"user": 1,
				"tokenAmount":1,
				"createdAt": 1,
				"yesterday": {
					"$subtract": [new Date(), 86400000]
				}
			}
		},
		{
			"$project": {
				"user": 1,
				"tokenAmount":1,
				"yesterday": 1,
				"createdAt": 1,
				"dateComp": { "$cmp": ["$yesterday", "$createdAt"] }
			}
		},
		{
			"$match": {
				"dateComp": -1,
				"user": userId,
			}
		},
		{
			$group: {
				"_id": "$createdAt",
				totalAmount: { "$sum": "$tokenAmount" }
			},
		}
	]);
};

module.exports = {
	getTokenWinInCurrentDay,
	findRecordByTime,
	dayWiseRecord,
	totalEarningInUsd,
	todayEarningHistory
};