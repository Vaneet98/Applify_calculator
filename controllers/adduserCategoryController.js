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
const path = require("path");
const categoryProjection = ["email", "Name","category"];
const Sequelize = require("sequelize");


module.exports = {
  adduserCategory: async (payloadData, path) => {
    const schema = Joi.object().keys({
        password:Joi.string().optional(),
        email:Joi.string().optional(),
        mobile: Joi.number().optional(),
        web: Joi.number().optional(),
        both: Joi.number().optional(),
        email: Joi.number().optional(),
        twoStep: Joi.number().optional(),
        viaSocial: Joi.number().optional(),
        NoSignUp: Joi.number().optional(),
        accrequired: Joi.number().optional(),
        notrequired: Joi.number().optional(),
        userFeed: Joi.number().optional(),
        search: Joi.number().optional(),
        pushNoti: Joi.number().optional(),
        messUserMan: Joi.number().optional(),
        RatingReview: Joi.number().optional(),
        RewardDeal: Joi.number().optional(),
        payEcommerce: Joi.number().optional(),
        categoryFilter: Joi.number().optional(),
        userGenerated: Joi.number().optional(),
        Booking: Joi.number().optional(),
    });
	let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    
    let objToSave = {};  
    if (_.has(payload, "password") && payload.password != "") objToSave.password = payload.password;
    if (_.has(payload, "email") && payload.email != "") objToSave.email = payload.email;
    if (_.has(payload, "mobile") && payload.mobile != "") objToSave.mobile = payload.mobile;
    if (_.has(payload, "web") && payload.web != "") objToSave.web = payload.web;
    if (_.has(payload, "both") && payload.both != "") objToSave.both = payload.both;
    if (_.has(payload, "email") && payload.email != "") objToSave.email = payload.email;
    if (_.has(payload, "twoStep") && payload.twoStep != "") objToSave.twoStep = payload.twoStep;
    if (_.has(payload, "viaSocial") && payload.viaSocial != "") objToSave.viaSocial = payload.viaSocial;
    if (_.has(payload, "NoSignUp") && payload.NoSignUp != "") objToSave.NoSignUp = payload.NoSignUp;
    if (_.has(payload, "accrequired") && payload.accrequired != "") objToSave.accrequired = payload.accrequired;
    if (_.has(payload, "notrequired") && payload.notrequired != "") objToSave.notrequired = payload.notrequired;
    if (_.has(payload, "userFeed") && payload.userFeed != "") objToSave.userFeed = payload.userFeed;
    if (_.has(payload, "search") && payload.search != "") objToSave.search = payload.search;
    if (_.has(payload, "pushNoti") && payload.pushNoti != "") objToSave.pushNoti = payload.pushNoti;
    if (_.has(payload, "messUserMan") && payload.messUserMan != "") objToSave.messUserMan = payload.messUserMan;
    if (_.has(payload, "RatingReview") && payload.RatingReview != "") objToSave.RatingReview = payload.RatingReview;
    if (_.has(payload, "RewardDeal") && payload.RewardDeal != "") objToSave.RewardDeal = payload.RewardDeal;
    if (_.has(payload, "payEcommerce") && payload.payEcommerce != "") objToSave.payEcommerce = payload.payEcommerce;
    if (_.has(payload, "categoryFilter") && payload.categoryFilter != "") objToSave.categoryFilter = payload.categoryFilter;
    if (_.has(payload, "userGenerated") && payload.userGenerated != "") objToSave.userGenerated = payload.userGenerated;
    if (_.has(payload, "Booking") && payload.Booking != "") objToSave.Booking = payload.Booking;
    
let addPlateform = await Service.adduserCategoryService.saveData(objToSave);
if (addPlateform) {
  return message.success.ADDED;
} else {
  return Response.error_msg.notAdded;
}
  },

  getuserCategory:  async(paramData) => {
    let profile = Service.adduserCategoryService.getallusercategory();
    if (profile) {
      return profile;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },
};