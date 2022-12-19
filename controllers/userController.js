const _ = require("underscore");
const moment = require("moment");
const Service = require("../services");
const message = require("../config/messages");
let Response = require("../config/response");
const Joi = require("joi");
let config = require("../config/env")();
let commonHelper = require("../Helper/common");
let NotificationManager = require("../Helper/mailer");
let TokenManager = require("../Helper/adminTokenManager");
const privateKey = config.APP_URLS.PRIVATE_KEY_ADMIN;
const path = require("path");
const profileProjection = ["id", "email", "Image", "Name","phoneNumber","dateOfBirth","Gender"];
const Sequelize = require("sequelize");


module.exports = {
  addUser: async (payloadData, path) => {
    const schema = Joi.object().keys({
      email: Joi.string().optional(),
      Name: Joi.string().optional(),
    });

    let generatedString = commonHelper.generateRandomString(6, "numeric");
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
		let condition = {
			email: payload.email,
			isDeleted: 0,
		};
		let checkProfile = await Service.profileServices.getProfile(condition, ["id", "email", "emailVerified"], false);
		if (checkProfile) throw Response.error_msg.alreadyExist;
		let objToSave = {};

    if (_.has(payload, "email") && payload.email != "") objToSave.email = payload.email; 
    if (_.has(payload, "Name") && payload.Name != "") objToSave.Name = payload.Name;
  
    objToSave.passwordResetToken = generatedString;
    let addProfile = await Service.profileServices.saveData(objToSave);
    console.log("addProfile====>",addProfile)
    if (addProfile) {
      let path = "/veteran/v1/honorvet/generatePassword?email=" + payload.email + "&token=";
      var variableDetails = {
        user_name: (payload.Name || "Profile user"),
        ip: config.APP_URLS.API_URL,
        baseURL: config.APP_URLS.API_URL,
        // s3Url: config.AWS.S3.s3Url,
        resetPasswordToken: config.APP_URLS.API_URL + path + generatedString
      }
      await NotificationManager.sendMail("PROFILE_HONOR", payload.email, variableDetails);
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },

  createProfile: async (payloadData) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required(),
      Image: Joi.string().optional(),
      phoneNumber: Joi.number().optional(),
      dateOfBirth: Joi.string().optional(),
      Gender: Joi.string().optional(),
    });

		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    let condition={
    id:payload.id
    }
    let objToSave = {};
    if (_.has(payload, "id") && payload.id != "") objToSave.id = payload.id;
    if (_.has(payload, "Image") && payload.Image != "") objToSave.Image = payload.Image;
   if (_.has(payload, "phoneNumber") && payload.phoneNumber != "") objToSave.phoneNumber = payload.phoneNumber;
    if (_.has(payload, "dateOfBirth") && payload.dateOfBirth != "") objToSave.dateOfBirth = payload.dateOfBirth;
    if (_.has(payload, "Gender") && payload.Gender != "") objToSave.Gender = payload.Gender;
    let addProfile = await Service.profileServices.updateData(condition,objToSave);
    if (addProfile) {
      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },

  getProfileById :  async(paramData) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({version: "uuidv4"}).required()
    });
    let payload = await commonHelper.verifyJoiSchema(paramData, schema);
    console.log("payload=======>1",payload);
    let criteria = {
      id: payload.id,
    };
    console.log("criteria=====>",criteria);
    let profile = Service.profileServices.getProfile(criteria, profileProjection, true);
    if (profile) {
      return profile;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },

  validateToken: async(payloadData) => {
		const schema = Joi.object().keys({
			token: Joi.string().min(3).max(100).required(),
			email: Joi.string().email().max(200).required()
		});
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
		if (!payload || !payload.token) {
			throw Response.error_msg.implementationError;
		} else {
			let criteria = {
				email: payload.email || "",
				isDeleted: 0
			};
			criteria.passwordResetToken = payload.token;
			let data = await Service.profileServices.getProfile(criteria, ["id", "email", "Name"], false);
			if (!data) throw Response.error_msg.emailNotFound;
			return data;
		}
	},

  resetNewPassword: async(payloadData) => {
		const schema = Joi.object().keys({
			email: Joi.string().optional(),
			token: Joi.string().optional().required(),
			newPassword: Joi.string().min(5).required()
		});
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
		let adminObj = null;
		let criteria = {
			isDeleted: 0,
			passwordResetToken: payload.token
		};
		let admin = await Service.profileServices.getProfile(criteria, ["id", "email", "Name", "password"], false);
		if (admin) {
			adminObj = admin.dataValues;
			if (adminObj && adminObj.id) {
				let criteria = {
					id: adminObj.id
				};
				let objToSave = {
					password: await commonHelper.generateNewPassword(payload.newPassword),
					forgotPasswordGeneratedAt: null,
					passwordResetToken: null
				};
				let update = await Service.profileServices.updateData(criteria, objToSave);
				if (update) {
					return {};
				} else throw Response.error_msg.implementationError;
			} else {
				throw Response.error_msg.implementationError;
			}
		} else {
			throw Response.error_msg.InvalidPasswordToken;
		}
	},

  login: async(payloadData) => {
		const schema = Joi.object().keys({
			email: Joi.string().email().max(200).required(),
			password: Joi.string().required(),
		});
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
		let emailCriteria = {
			email: payload.email,
			isDeleted: 0
		};
		let projection = [...profileProjection];
		projection.push("password");
		let checkEmailExist = await Service.profileServices.getProfile(emailCriteria, projection, true);
		if (checkEmailExist && checkEmailExist.id) {
			let comparePass = await commonHelper.comparePassword(payload.password, checkEmailExist.password);
			let tokenGenerated;
			if (checkEmailExist.isBlocked === 1) throw Response.error_msg.blockUser;
			else if (!comparePass) {
				throw Response.error_msg.passwordNotMatch;
			} else {
				let tokenData = {
					email: checkEmailExist.email,
					id: checkEmailExist.id,
          Name: checkEmailExist.Name
				};
				TokenManager
					.setToken(tokenData, privateKey, (err, output) => {
						if (err) {
							throw Response.error_msg.implementationError;
						} else {
							if (output && output.accessToken) {
								tokenGenerated = output.accessToken;
							} else {
								throw Response.error_msg.implementationError;
							}
						}
					});
				delete checkEmailExist.dataValues["password"];
				let response = {
					accessToken: tokenGenerated,
					profileDetails: checkEmailExist
				};
				return response;
			}
		} else throw Response.error_msg.emailNotFound;
	},

  forgotPassword: async(payloadData) => {
		const schema = Joi.object().keys({
			email: Joi.string().email().max(200).required()
		});
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
		let generatedString = commonHelper.generateRandomString(6, "numeric");
		var adminObj = null;
		var criteria = {
			email: payload.email,
			isDeleted: 0
		};
		let adminData = await Service.profileServices.getProfile(criteria, ["email", "Name", "id", "forgotPasswordGeneratedAt", "isBlocked"], false);
		adminObj = adminData;
		if (!adminObj) {
			throw Response.error_msg.emailNotFound;
		} else if (adminObj && adminObj.isBlocked === 1) {
			throw Response.error_msg.blockUser;
		} else if (adminObj && adminObj.forgotPasswordGeneratedAt && (moment(new Date(Date.now())).diff(adminObj.forgotPasswordGeneratedAt, "minutes") <= 1)) {
			throw Response.error_msg.tryAfterSomeTime;
		}
		let objToSave = {
			forgotPasswordGeneratedAt: moment(new Date(Date.now())).format("YYYY-MM-DD HH:mm:ss"),
			passwordResetToken: generatedString
		};
		await Service.profileServices.updateData(criteria, objToSave);
		let path = "/veteran/v1/honorvet/generatePassword?email" + payload.email + "&token=";
		var variableDetails = {
			user_name: (adminData.Name || "Admin User"),
			ip: config.APP_URLS.API_URL,
			baseUrl: config.APP_URLS.API_URL,
			s3Url: config.AWS.S3.s3Url,
			resetPasswordToken: config.APP_URLS.API_URL + path + generatedString
		};
		await NotificationManager.sendMail("FORGOT_PASSWORD_ADMIN", payload.email, variableDetails);
	},

};