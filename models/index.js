var Sequelize = require("sequelize");
var sequelize = require("../dbConnection").sequelize;
module.exports = {
  profile: require("./user")(Sequelize, sequelize, Sequelize.DataTypes),
  plateform: require("./plateformModel")(Sequelize, sequelize, Sequelize.DataTypes),
  category: require("./addcategoryModel")(Sequelize, sequelize, Sequelize.DataTypes),
  adduserCategory: require("./adduserCategoryModel")(Sequelize, sequelize, Sequelize.DataTypes),
  industryCategory: require("./industryCategoryModel")(Sequelize, sequelize, Sequelize.DataTypes),

};