let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("user", {
		...require("./core")(Sequelize, DataTypes),
		email: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		emailVerified: {
			type: DataTypes.TINYINT(1),
			defaultValue: 0,
			field: "emailVerified"
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: "password"
		},
		passwordResetToken: {
			type: DataTypes.STRING(200),
			allowNull: true,
			field: "passwordResetToken"
		},
		forgotPasswordGeneratedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW(0),
			field: "forgotPasswordGeneratedAt"
		},
		Image: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		Name: {
			type: DataTypes.STRING(150),
			defaultValue: null,
		},
		phoneNumber: {
			type: DataTypes.STRING(16),
			defaultValue: null,
		},
		dateOfBirth: {
			type: DataTypes.DATE,
            field: "dateOfBirth"
		},
		Gender: {
			type: DataTypes.ENUM,
            values: appConstants.APP_CONSTANTS.GENDER
		},

	}, {
		tableName: "user",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};