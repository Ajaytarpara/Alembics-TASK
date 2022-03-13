const DreamToken = require('../../model/dreamToken');
const dbService = require('../../utils/dbService');
const _ = require('lodash');
const dreamTokenService = require('../../services/dreamToken');

module.exports = {

    createTokenEntry: async (req, res) => {
        try {
            if (!req.user) {
                return res.unAuthorizedRequest();
            }
            let data = req.body;
            let createDoc = {};
            let tokenWinToday = await dreamTokenService.getTokenWinInCurrentDay(req.user.id)
            if (tokenWinToday + data.tokenAmount < 5) {
                createDoc.tokenAmount = data.tokenAmount;
                createDoc.user = req.user.id;
                createDoc.tokenInUsd = data.tokenAmount * 0.15;

                let result = await dbService.createDocument(DreamToken, createDoc);
                if (!result) {
                    return res.badRequest({});
                }
                return res.ok(result);
            }
            return res.successMessage("User can not win more than 5 Dream Token in Day", {});
        }
        catch (error) {
            return res.failureResponse(error.message);
        }
    },

};
