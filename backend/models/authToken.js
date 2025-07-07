'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class AuthToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AuthToken.belongsTo(models.user,{
        as:'user',
        foreignKey: 'userId'
      })
    }
  }
  AuthToken.init({
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'auth_token',
  });
  return AuthToken;
};