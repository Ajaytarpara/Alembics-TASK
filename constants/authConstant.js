/*
 * constants
 */

const JWT = {
	CLIENT_SECRET: 'myjwtclientsecret',
	EXPIRES_IN: 900
};

const USER_ROLE = {
	User: 1,
};

const PLATFORM = {
	CLIENT: 1,
};

let LOGIN_ACCESS = {
	[USER_ROLE.User]: [PLATFORM.CLIENT],
};

module.exports = {
	JWT,
	USER_ROLE,
	PLATFORM,
	LOGIN_ACCESS
};