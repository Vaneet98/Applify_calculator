const Response = require("../config/response");
const { post } = require("../router");
// const Models = require("../models");
const { posts } = require("../models");

exports.count = (model, criteria) => {
	return new Promise((resolve, reject) => {
		let where = criteria;
		where.isDeleted = 0;
		model
			.count({
				where: where,
			}).then(result => {
				resolve(result);
			}).catch((err) => {
				console.log(err);
				reject(Response.error_msg.implementationError);
			});
	});
};

// Models.users.hasOne(Models.posts, {
// 	foreignKey: "userId"
// });


exports.getSingleRecord = (model, criteria, projection, posts) => {
	console.log("baseService=====>",projection);
	return new Promise((resolve, reject) => {
		model
			.findOne({
				where: criteria,
				attributes: projection,
			}).then(result => {
				resolve(result);
			}).catch((err) => {
				console.log(err);
				reject(Response.error_msg.implementationError);
			});
	});
};

exports.saveData = (model, objToSave) => {
	return new Promise((resolve, reject) => {
		model
			.create(objToSave)
			.then((result) => {
				resolve(result);
			}).catch((err) => {
				console.log(err);
				reject(Response.error_msg.implementationError);
			});
	});
};

exports.updateData = (model, criteria, objToSave,) => {
	console.log("%%%%%%%%%",objToSave)
	return new Promise((resolve, reject) => {
		model
			.update(objToSave, { where: criteria })
			.then(result => {
				resolve(result);
			}).catch((err) => {
				console.log(err);
				reject(Response.error_msg.implementationError);
			});
	});
};

exports.delete = (model, criteria) => {
	return new Promise((resolve, reject) => {
		model
			.destroy({ where: criteria })
			.then(result => {
				resolve(result);
			}).catch((err) => {
				console.log(err);
				reject(Response.error_msg.implementationError);
			});
	});
};

exports.saveBulData = (model, objToSave) => {
	return new Promise((resolve, reject) => {
	  model
		.bulkCreate(objToSave)
		.then((result) => {
		  resolve(result);
		})
		.catch((err) => {
		  console.log(err);
		  reject(Response.error_msg.implementationError);
		});
	});
  };
  