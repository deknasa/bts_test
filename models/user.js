'use strict';
const {
  Model
} = require('sequelize');
const {hashedPassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Checklist, {
        as: "checklist",
        foreignKey: "user_id"
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "username is required"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use. Try another one!'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Email must be valid"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 10],
          msg: "The password length should be between 7 and 10 characters!"
        },
        notEmpty: {
          args: true,
          msg: "Password is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: { 
      beforeCreate: (user, opt) => {
        const hashPassword = hashedPassword(user.password);
        user.password = hashPassword
      },
    }
  });
  return User;
};