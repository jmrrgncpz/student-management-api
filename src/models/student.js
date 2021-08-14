'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Student.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notNull: true,
      }
    },
    isSuspended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        notNull: true
      }
    }
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};