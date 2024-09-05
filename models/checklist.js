'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: "checklist",
        foreignKey: "user_id"
      })

      this.hasMany(models.ChecklistItem, {
        as: "ChecklistItem",
        foreignKey: "checklist_id"
      })
    }
  }
  Checklist.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "name is required"
        },
      }
    },
    user_id: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Checklist',
  });
  return Checklist;
};