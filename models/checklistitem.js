'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChecklistItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Checklist, {
        as: "ChecklistItem",
        foreignKey: "checklist_id"
      })
    }
  }
  ChecklistItem.init({
    itemName: DataTypes.STRING,
    checklist_id: DataTypes.STRING ,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ChecklistItem',
  });
  return ChecklistItem;
};