const dreamTokenService = require('../../services/dreamToken');

module.exports = {

    winOfTheDay: async (req, res) => {
        try {
            let loginUser = req.user;
            if (!loginUser) {
                return res.unAuthorizedRequest();
            }
            let tokenWinTodayHistory = await dreamTokenService.todayEarningHistory(req.user.id);
            return res.ok({ tokenWinTodayHistory });
        }
        catch (error) {
            console.error(error);
            return res.failureResponse(error.message);
        }
    },

    earningHistoryInUsd: async (req, res) => {
        try {
            let loginUser = req.user;
            if (!loginUser) {
                return res.unAuthorizedRequest();
            }
            let dayWiseEarn = await dreamTokenService.dayWiseRecord(req.user.id);
            return res.ok({ dayWiseEarnInUsd: dayWiseEarn });
        }
        catch (error) {
            console.error(error);
            return res.failureResponse(error.message);
        }
    },

    accountEarningStats: async (req, res) => {
        try {
            let loginUser = req.user;
            if (!loginUser) {
                return res.unAuthorizedRequest();
            }
            let tokenWinToday = await dreamTokenService.getTokenWinInCurrentDay(req.user.id);
            let totalEarningInUsd = await dreamTokenService.totalEarningInUsd(req.user.id);
            totalEarningInUsd = parseFloat((totalEarningInUsd[0].totalAmount - tokenWinToday) * 0.15);
            return res.ok({ todayWinAmount: tokenWinToday, totalEarningInUsd });
        }
        catch (error) {
            console.error(error);
            return res.failureResponse(error.message);
        }
    },

};