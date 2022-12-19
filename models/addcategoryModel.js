let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("addcategory", {
		...require("./core")(Sequelize, DataTypes),
		email: {
			type: DataTypes.STRING(200),
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(100),
            allowNull:false	
		},
		category: {
			type: DataTypes.STRING(100),
			allowNull: true,
		},
	}, {
		tableName: "addcategory",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};