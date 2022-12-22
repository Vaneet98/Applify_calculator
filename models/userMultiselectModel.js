let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("userMultiselectData", {
		...require("./core")(Sequelize, DataTypes),
		SelectedCategory: {
			type: DataTypes.STRING(100),
			allowNull: true,
		},
        userId: {
            type: DataTypes.UUID, allowNull:false,
            references: {
              model: "userSelectData",
              key: "id",
            },
            onUpdate: "CASCADE",
			onDelete: "CASCADE",  
          },
	}, {
		tableName: "userMultiselectData",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};