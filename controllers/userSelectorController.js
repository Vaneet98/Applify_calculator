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

const Sequelize = require("sequelize");

module.exports = {
  //   addDetail: async (payloadData, path) => {
  //     // const schema = Joi.object().keys({
  //     //   email: Joi.string().optional(),
  //     //   name: Joi.string().optional(),
  //     //   AppType: Joi.string().optional(),
  //     //   IndustryAndCategory: Joi.string().optional(),
  //     //   Platefrom: Joi.string().optional(),
  //     //   LoginType: Joi.string().optional(),
  //     //   ProfileCreation: Joi.string().optional(),
  //     //   SelectedCategory: Joi.array().items(Joi.string()).optional(),
  //     // });
  //     const schema = Joi.object().keys({
  //       applifyContact: Joi.array().items(Joi.object()).optional(),
  //     });
  //     let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
  //     console.log("payload data===?", payload);

  //     let objToSave = {};
  //     if (_.has(payload, "email") &&payload.applifyContact[0].email != "")objToSave.email = payload.applifyContact[0].email;
  //     if (_.has(payload.applifyContact[0], "name") &&payload.applifyContact[0].name != "")objToSave.name = payload.applifyContact[0].name;
  //     if (_.has(payload.applifyContact[0], "AppType") &&payload.applifyContact[0].AppType != "")objToSave.AppType = payload.applifyContact[0].AppType;
  //     if (_.has(payload.applifyContact[0], "IndustryAndCategory") &&payload.applifyContact[0].IndustryAndCategory != "")objToSave.IndustryAndCategory =payload.applifyContact[0].IndustryAndCategory;
  //     if (_.has(payload.applifyContact[0], "Plateform") &&payload.applifyContact[0].Plateform != "")objToSave.Plateform =payload.applifyContact[0].Plateform;
  //     if (_.has(payload.applifyContact[0], "LoginType") &&payload.applifyContact[0].LoginType != "")objToSave.LoginType = payload.applifyContact[0].LoginType;
  //     if (_.has(payload.applifyContact[0], "ProfileCreation") &&payload.applifyContact[0].ProfileCreation != "")objToSave.ProfileCreation =payload.applifyContact[0].ProfileCreation;

  //     console.log("this is objecttosave", objToSave);

  //     let addPlateform = await Service.userSelectorService.saveData(objToSave);
  //     if (addPlateform) {
  //       let condition = {
  //         email: email.payload,
  //       };
  //       let userData = await Service.userSelectorService.getuserSelector(
  //         condition
  //       );
  //       if (userData) {
  //         let id = userData.id;
  //         let newSelectedCategory = [];
  //         if (
  //           _.has(payload.applifyContact[0], "SelectedCategory") &&
  //           payload.applifyContact[0].SelectedCategory.length > 0
  //         ) {
  //           payload.applifyContact[0].SelectedCategory.forEach(
  //             (SelectedCategory) => {
  //               newSelectedCategory.push({
  //                 userId: id,
  //                 SelectedCategory: SelectedCategory,
  //               });
  //             }
  //           );
  //         }
  //         console.log("This is selected data", newSelectedCategory);

  //         let store = await Service.userSelectorService.savebulkData(
  //           newSelectedCategory
  //         );
  //         if (store) {
  //           return message.success.ADDED;
  //         } else {
  //           return Response.error_msg.notAdded;
  //         }
  //       }
  //     }
  //   },

  addDetail: async (payloadData, path) => {
    const schema = Joi.object().keys({
      email: Joi.string().optional(),
      name: Joi.string().optional(),
      AppType: Joi.string().optional(),
      IndustryAndCategory: Joi.string().optional(),
      Plateform: Joi.string().optional(),
      LoginType: Joi.string().optional(),
      ProfileCreation: Joi.string().optional(),
      "SelectedCategory[]": Joi.array().items(Joi.string()).optional(),
    });
    console.log("payloadData data===?", payloadData);

    let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("payload data===?", payload);

    let objToSave = {};
    if (_.has(payload, "email") && payload.email != "")
      objToSave.email = payload.email;
    if (_.has(payload, "name") && payload.name != "")
      objToSave.name = payload.name;
    if (_.has(payload, "AppType") && payload.AppType != "")
      objToSave.AppType = payload.AppType;
    if (
      _.has(payload, "IndustryAndCategory") &&
      payload.IndustryAndCategory != ""
    )
      objToSave.IndustryAndCategory = payload.IndustryAndCategory;
    if (_.has(payload, "Plateform") && payload.Plateform != "")
      objToSave.Plateform = payload.Plateform;
    if (_.has(payload, "LoginType") && payload.LoginType != "")
      objToSave.LoginType = payload.LoginType;
    if (_.has(payload, "ProfileCreation") && payload.ProfileCreation != "")
      objToSave.ProfileCreation = payload.ProfileCreation;

    console.log("this is objecttosave", objToSave);

    let addPlateform = await Service.userSelectorService.saveData(objToSave);
    if (addPlateform) {
      let condition = {
        email: payload.email,
      };
      let userData = await Service.userSelectorService.getuserSelector(
        condition
      );         
      if (userData) {
        let id = userData.id;
        let newSelectedCategory = [];
        if (
          _.has(payload, "SelectedCategory[]") &&
          payload["SelectedCategory[]"].length > 0
        ) {
          payload["SelectedCategory[]"].forEach((SelectedCategory) => {
            newSelectedCategory.push({
              userId: id,
              SelectedCategory: SelectedCategory,
            });
          });
        }  
        console.log("This is selected data", newSelectedCategory);

        let store = await Service.userSelectorService.savebulkData(
          newSelectedCategory
        );
        if (store) {
          return message.success.ADDED;
        } else {
          return Response.error_msg.notAdded;
        }
      }

      return message.success.ADDED;
    } else {
      return Response.error_msg.notAdded;
    }
  },

  getDetail: async (paramData) => {
    let profile = Service.userSelectorService.getplateformAll();
    if (profile) {
      return profile;
    } else {
      throw Response.error_msg.recordNotFound;
    }
  },
};
