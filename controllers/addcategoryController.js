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
  addCategory: async (payloadData, path) => {
    const schema = Joi.object().keys({
        name: Joi.string().optional(),
        email: Joi.string().optional(),
        category: Joi.string().optional(),
        
    });
	let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    
    let objToSave = {};  
    if (_.has(payload, "name") && payload.name != "") objToSave.name = payload.name;
    if (_.has(payload, "email") && payload.email != "") objToSave.email = payload.email;
    if (_.has(payload, "category") && payload.category != "") objToSave.category = payload.category;
   
let addPlateform = await Service.addCategoryService.saveData(objToSave);
if (addPlateform) {
  return message.success.ADDED;
} else {
  return Response.error_msg.notAdded;
}
  },

  editCategory: async (payloadData, path) => {
    const schema = Joi.object().keys({
      id: Joi.string().guid({ version: "uuidv4" }).required(),
      name: Joi.string().optional(),
      email: Joi.string().optional(),
      category: Joi.string().optional(),
    });
	let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?",payload)
    
    let condition={
      id:payload.id
      }
    
    let objToSave = {};
    
    if (_.has(payload, "id") && payload.id != "") objToSave.id = payload.id;
    if (_.has(payload, "name") && payload.name != "") objToSave.name = payload.name;
    if (_.has(payload, "email") && payload.email != "") objToSave.email = payload.email;
    if (_.has(payload, "category") && payload.category != "") objToSave.category = payload.category;
   
    
let addPlateform = await Service.addCategoryService.updateData(condition,objToSave);
if (addPlateform) {
  return message.success.ADDED;
} else {
  return Response.error_msg.notAdded;
}
  },

  getCategroy:  async(paramData) => {
    let profile = Service.addCategoryService.getcategory();
    if (profile) {
      return profile;
    } else {
      throw Response.error_msg.recordNotFound
    }
  },
};