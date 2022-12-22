let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("userSelectData", {
		...require("./core")(Sequelize, DataTypes),
		email: {
			type: DataTypes.STRING(200),
			allowNull: true
		},                           
		name: {
			type: DataTypes.STRING(100),
            allowNull:true
		},
		AppType: {
			type: DataTypes.STRING(100),
			allowNull: true,
		},
        IndustryAndCategory:{
            type:DataTypes.STRING(190),
            allowNull:true
        },
        Plateform:{
            type:DataTypes.STRING(150),
            allowNull:true
        },     
        LoginType:{
            type:DataTypes.STRING(100)
        },
        ProfileCreation:{
            type:DataTypes.STRING(180)
        }
	}, {
		tableName: "userSelectData",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};