const User = require('../model/user');
const dbService = require('../utils/dbService');
const { JWT } = require('../constants/authConstant');
const jwt = require('jsonwebtoken');
const tokenService = require('./token');
const _ = require('lodash');

let auth = module.exports;

auth.loginWithOTP = async (username, password, url) => {
  try {
    let result = await auth.loginUser(username, password, url);
    if (!result.flag) {
      result.loginOTP = null;
      await dbService.updateDocument(User, { _id: result.data.id }, { loginOTP: null });
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

auth.loginUser = async (username, userPassword) => {
  try {
    let where = { 'email': username };
    let user = await dbService.getDocumentByQuery(User, where);
    if (user) {
      const isPasswordMatched = await user.isPasswordMatch(userPassword);
      if (isPasswordMatched) {
        const {
          password, ...userData
        } = user.toJSON();
        let token = await tokenService.generateAuthTokens(userData, JWT.CLIENT_SECRET);;
        let userToReturn = {
          ...userData,
          ...{ token }
        };
        userToReturn = _.omit(userToReturn, ['password']);
        return {
          flag: false,
          data: userToReturn
        };
      } else {
        return {
          flag: true,
          data: 'Incorrect Password'
        };
      }
    } else {
      return {
        flag: true,
        data: 'User not exists'
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
