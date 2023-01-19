import { Sequelize, DataTypes } from 'sequelize';
import ProvinceModel from './province';


const RegionModel = (sequelize: Sequelize, DataTypes) => {
  return sequelize.define('region', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  })
}

export default RegionModel