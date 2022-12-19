"use strict ";
var Jwt = require("jsonwebtoken");
var Service = require("../services");
const Response = require("../config/response");
const messages = require("../config/messages");
var setTokenInDBAdmin = async (userId, token) => {
	console.log("setTokenInDBAdmin", userId, token);
	var dataToSave = {
		adminId: userId,
		accessToken: token,
	};
	let condition = {
		adminId: userId,
	};
	await Service.adminSessionServices.deleteSessions(condition);
	let createSession = await Service.adminSessionServices.saveSessionData(dataToSave);
	if (!createSession) throw Response.error_msg.implementationError;
};
var expireTokenInDBAdmin = async (userId) => {
	let condition = {
		adminId: userId,
	};
	return await Service.adminSessionServices.deleteSessions(condition);
};
var setTokenAdmin = (tokenData, PRIVATE_KEY, callback) => {
	console.log("tokenData===",tokenData.id,PRIVATE_KEY)
	if (!tokenData.id) {
		callback(Response.error_msg.implementationError);
	} else {
		console.log("tokenData===Else",tokenData,PRIVATE_KEY)
		var tokenToSend = Jwt.sign(tokenData, PRIVATE_KEY);
		console.log("tokenToSend====",tokenToSend)
		setTokenInDBAdmin(tokenData.id, tokenToSend);
		callback(null, { accessToken: tokenToSend });
	}
};
var expireTokenAdmin = (token, callback) => {
	expireTokenInDBAdmin(token.id);
	callback(null, messages.success.LOGOUT);
};
module.exports = {
	expireToken: expireTokenAdmin,
	setToken: setTokenAdmin,
};