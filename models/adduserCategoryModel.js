let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("plateformUserData", {
		...require("./core")(Sequelize, DataTypes),
        email:{
            type:DataTypes.STRING,
        },
        password:{
           type:DataTypes.STRING
        },
		web: {
			type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
		},
        mobile:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        },
        both:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        },
        email:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        },
        twoStep:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        },
        viaSocial:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        },
        NoSignUp:{
            type: DataTypes.INTEGER,
			defaultValue:0
        },
        accrequired:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        },
        notrequired:{
            type: DataTypes.INTEGER,
		    defaultValue:0
        },
        userFeed:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        },
        search:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        },
        pushNoti:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        },
        messUserMan:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        },
        RatingReview:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        },
        RewardDeal:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        },
        payEcommerce:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        },
        categoryFilter:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        },
        userGenerated:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        },
        Booking:{
            type: DataTypes.INTEGER,
			allowNull: false,
            defaultValue:0
        }
	}, {
		tableName: "plateformUserData",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};