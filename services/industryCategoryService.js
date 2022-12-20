const _ = require("underscore");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Models = require("../models");
const Response = require("../config/response");
const baseService = require("./base");

exports.saveData = async (objToSave) => {
  console.log("objto save ---save==>", objToSave);
  return await baseService.saveData(Models.industryCategory, objToSave);
};

exports.updateData = async (criteria, objToSave) => {
  console.log("obj to save=====>", objToSave);
  return await baseService.updateData(
    Models.industryCategory,
    criteria,
    objToSave
  );
};
exports.delete = async (criteria) => {
  return await baseService.delete(Models.industryCategory, criteria);
};

exports.getAllPlateform = (criteria, projection, limit, offset) => {
  let where = {};
  let order = [["createdAt", "DESC"]];

  if (criteria && criteria.search) {
    where = {
      [Op.or]: {
        firstName: {
          [Op.like]: "%" + criteria.search + "%",
        },
        lastName: {
          [Op.like]: "%" + criteria.search + "%",
        },
        email: {
          [Op.like]: "%" + criteria.search + "%",
        },
        id: {
          [Op.like]: "%" + criteria.search + "%",
        },
      },
    };
  }

  if (criteria.sortBy && criteria.orderBy) {
    order = [[criteria.sortBy, criteria.orderBy]];
  }
  where.isDeleted = 0;
  if (criteria["isBlocked"] === 1) where.isBlocked = 1;
  if (criteria["isDeleted"] === 1) where.isBlocked = 0;

  return new Promise((resolve, reject) => {
    Models.industryCategory
      .findAndCountAll({
        limit,
        offset,
        where: where,
        attributes: projection,
        order: order,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log("getAll err ==>>  ", err);
        reject(Response.error_msg.implementationError);
      });
  });
};

exports.getplateform = (criteria, projection) => {
  return new Promise((resolve, reject) => {
    Models.industryCategory
      .findOne({
        where: criteria,
        attributes: projection,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log("get err ==>>  ", err);
        reject(Response.error_msg.implementationError);
      });
  });
};

exports.getplateformAll = (condition) => {
  return new Promise((resolve, reject) => {
    Models.industryCategory
      .findAll({
        where: condition,
      })
      .then((result) => {
        console.log("this is result",result)
        resolve(result);
      })
      .catch((err) => {
        console.log("get err ==>>  ", err);
        reject(Response.error_msg.implementationError);
      });
  });
};
