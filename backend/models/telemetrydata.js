'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class telemetrydata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      telemetrydata.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  telemetrydata.init({
    deviceId: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    energyWatts: DataTypes.FLOAT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'telemetrydata',
  });
  return telemetrydata;
};